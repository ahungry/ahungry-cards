let elevateTimeout
let activeEl
let mouseX = 0
let mouseY = 0
let x = 0
let y = 0
let z = 0
let offsetLeft = 0
let offsetTop = 0

let lastM = ''

function debug (m) {
  if (m === lastM) return
  document.getElementById('debug').innerHTML = JSON.stringify(m)
  lastM = m
}

setInterval(() => {
  document.getElementById('debug').innerHTML = ''
}, 10000)

/**
 * Toggles the activated state of a card.
 */
function activate (el) {
  activeEl = undefined

  el.style.boxShadow = '3px 3px 2px rgba(0,0,0,0.8)'

  if (el.activated) {
    el.style.borderRadius = '0px'
    el.style.borderColor = '#000'
    el.style.borderStyle = 'solid'
    el.activated = false
  } else {
    el.style.borderRadius = '0px 40px 0px 40px'
    el.style.borderColor = '#000'
    el.style.borderStyle = 'dashed'
    el.activated = true
  }
}

function handleMousePos (x, y) {
  mouseX = x
  mouseY = y
}

/**
 * If we have a card selected (active) move it around by updating it's position.
 */
function handleCardMove (x, y) {
  if (activeEl) {
    const offsetX = (mouseX - offsetLeft)
    const offsetY = (mouseY - offsetTop)

    activeEl.style.left = x - offsetX + 'px'
    activeEl.style.top = y - offsetY + 'px'
  }
}

/**
 * Initialize the card offsets and the active clicked card.  Ensures
 * it displays on top and has some indicator it is active (raised shadow).
 * Triggers an activate effect on double click.
 */
function handleCardDown (el) {
  activeEl = el

  clearTimeout(elevateTimeout)
  elevateTimeout = setTimeout(() => {
    activeEl.style.boxShadow = '10px 20px 6px rgba(0,0,0,0.8)'
  }, 200)

  offsetLeft = el.offsetLeft
  offsetTop = el.offsetTop

  const clickCount = el.clicked || 0
  el.clicked = clickCount + 1

  if (el.clicked >= 2) {
    activate(el)
  }
  setTimeout(() => { el.clicked = 0 }, 500)

  el.style.zIndex = z++
}

/**
 * Card has stopped being dragged - turn off indicators.
 */
function handleCardUp () {
  activeEl.style.boxShadow = '3px 3px 2px rgba(0,0,0,0.8)'

  activeEl = undefined
}

function disableDrags (el) {
  ['dragstart', 'dragend', 'dragover', 'drag'].map(s => {
    el.addEventListener(s, (e) => { return e.preventDefault() })
  })
}

document.addEventListener('mouseup', (e) => {
  handleCardUp()
})

document.addEventListener('mousemove', (e) => {
  handleCardMove(e.pageX, e.pageY)
})

document.addEventListener('mousedown', (e) => {
  handleMousePos(e.clientX, e.clientY)
})

const els = document.querySelectorAll('.card')

for (let i = 0; i < els.length; i++) {
  const el = els[i]

  el.addEventListener('touchstart', (e) => {
    e.preventDefault()
    handleMousePos(e.touches[0].clientX, e.touches[0].clientY)
    handleCardDown(el)
  })

  el.addEventListener('touchmove', (e) => {
    e.preventDefault()
    handleCardMove(e.touches[0].clientX, e.touches[0].clientY)
  })

  el.addEventListener('touchend', (e) => {
    e.preventDefault()
    handleCardUp()
  })

  el.addEventListener('mousedown', (e) => {
    handleCardDown(el)
  })

  disableDrags(el)
}
