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

function handleCardMove (x, y) {
  if (activeEl) {
    const offsetX = (mouseX - offsetLeft)
    const offsetY = (mouseY - offsetTop)

    activeEl.style.left = x - offsetX + 'px'
    activeEl.style.top = y - offsetY + 'px'
  }
}

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

document.addEventListener('mouseup', (e) => {
  debug('mouse up')
  activeEl.style.boxShadow = '3px 3px 2px rgba(0,0,0,0.8)'

  activeEl = undefined
})

document.addEventListener('mousemove', (e) => {
  handleCardMove(e.pageX, e.pageY)
})

document.addEventListener('mousedown', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

const els = document.querySelectorAll('.card')

for (let i = 0; i < els.length; i++) {
  const el = els[i]

  // TODO: Think about how to provide similar D&D for this.
  el.addEventListener('touchstart', (e) => {
    e.preventDefault()
    debug('touchstart')
    mouseX = e.touches[0].clientX
    mouseY = e.touches[0].clientY

    handleCardDown(el)
  })

  el.addEventListener('touchmove', (e) => {
    e.preventDefault()
    handleCardMove(e.touches[0].clientX, e.touches[0].clientY)
  })

  el.addEventListener('touchend', (e) => {
    activeEl.style.boxShadow = '3px 3px 2px rgba(0,0,0,0.8)'

    activeEl = undefined
    e.preventDefault()
  })

  el.addEventListener('mousedown', (e) => {
    handleCardDown(el)
  })

  el.addEventListener('dragstart', (e) => {
    return e.preventDefault()
  })

  el.addEventListener('dragend', (e) => {
    return e.preventDefault()
  })

  el.addEventListener('dragover', (e) => {
    return e.preventDefault()
  })

  el.addEventListener('drag', (e) => {
    return e.preventDefault()
  })
}
