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

function activate (el) {
  activeEl = undefined

  if (el.activated) {
    el.style.borderRadius = '5px'
    el.activated = false
  } else {
    el.style.borderRadius = '200px'
    el.activated = true
  }
}

setInterval(() => {
  document.getElementById('debug').innerHTML = ''
}, 10000)

document.addEventListener('mouseup', (e) => {
  debug('mouse up')
  activeEl = undefined
})

document.addEventListener('mousedown', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

document.addEventListener('mousemove', (e) => {
  debug({ x: e.pageX, y: e.pageY })

  console.log(activeEl)

  if (activeEl) {
    const offsetX = (mouseX - offsetLeft)
    const offsetY = (mouseY - offsetTop)

    activeEl.style.left = e.pageX - offsetX + 'px'
    activeEl.style.top = e.pageY - offsetY + 'px'
  }
})

// document.ondragover = function (event) {
//   event = event || window.event
//   newX = event.pageX
//   newY = event.pageY
//   // console.log('ff drag', { x, y, newX, newY })

//   const oldX = activeEl.oldX || 0
//   const oldY = activeEl.oldY || 0

//   if (newX !== oldX) x = newX
//   if (newY !== oldY) y = newY
//   // debug({ newX, newY })
// }

const els = document.querySelectorAll('.card')

for (let i = 0; i < els.length; i++) {
  const el = els[i]

  // TODO: Think about how to provide similar D&D for this.
  el.addEventListener('touchstart', (e) => {
    debug('touchstart')
    e.preventDefault()
    // el.dispatchEvent(new Event('dragstart'))
    // alert(e.touches[0].clientX)
    mouseX = e.touches[0].clientX
    mouseY = e.touches[0].clientY

    activeEl = el
    offsetLeft = el.offsetLeft
    offsetTop = el.offsetTop
    el.style.zIndex = z++

    const clickCount = el.clicked || 0
    el.clicked = clickCount + 1
    debug(clickCount)

    setTimeout(() => { el.clicked = 0 }, 500)
    if (el.clicked >= 2) {
      activate(el)
      // alert('activate it...')
      // activeEl = undefined
      // el.style.borderRadius = '200px'
    }
  })

  el.addEventListener('touchmove', (e) => {
    // debug('touchmove')
    e.preventDefault()
    // el.dispatchEvent(new Event('drag'))

    // const el = e.target
    // const oldX = el.oldX || 0
    // const oldY = el.oldY || 0
    // const newX = e.touches[0].clientX
    // const newY = e.touches[0].clientY

    // if (newX !== oldX) x = newX
    // if (newY !== oldY) y = newY

    // el.style.left = x - 50 + 'px' // rect.left
    // el.style.top = y - 50 + 'px' // rect.top
    debug(activeEl)

    if (activeEl) {
      const offsetX = (mouseX - offsetLeft)
      const offsetY = (mouseY - offsetTop)

      activeEl.style.left = e.touches[0].clientX - offsetX + 'px'
      activeEl.style.top = e.touches[0].clientY - offsetY + 'px'
    }
  })

  el.addEventListener('touchend', (e) => {
    activeEl = undefined
    // debug('touchend')
    e.preventDefault()
    // el.dispatchEvent(new Event('dragend'))
    // el.style.left = '50px'
    // el.style.top = '50px'

    // const offsetX = (mouseX - el.offsetLeft)
    // const offsetY = (mouseY - el.offsetTop)

    // el.style.left = x - offsetX + 'px' // rect.left
    // el.style.top = y - offsetY + 'px' // rect.top

    // el.style.zIndex = z++
    // el.oldX = 0
    // el.oldY = 0
  })

  el.addEventListener('mousedown', (e) => {
    debug('mouse down')

    activeEl = el
    offsetLeft = el.offsetLeft
    offsetTop = el.offsetTop
    const clickCount = el.clicked || 0
    el.clicked = clickCount + 1

    if (el.clicked >= 2) {
      activate(el)
      // alert('activate it...')
      // activeEl = undefined
      // el.style.borderRadius = '200px'
    }
    setTimeout(() => { el.clicked = 0 }, 500)
    el.style.zIndex = z++
  })

  el.addEventListener('dragstart', (e) => {
    return e.preventDefault()
    debug('dragstart')
    activeEl = e.target
    const x = e.target.offsetLeft
    const y = e.target.offsetTop
    e.target.style.opacity = 0.5
  })

  el.addEventListener('dragend', (e) => {
    return e.preventDefault()
    debug('dragend')
    const offsetX = (mouseX - el.offsetLeft)
    const offsetY = (mouseY - el.offsetTop)

    el.style.left = x - offsetX + 'px' // rect.left
    el.style.top = y - offsetY + 'px' // rect.top
    el.oldX = 0
    el.oldY = 0
    console.log('drag end', { x, y })
    e.target.style.opacity = 1
  })

  el.addEventListener('dragover', (e) => {
    return e.preventDefault()
    console.log(e)
  })

  el.addEventListener('drag', (e) => {
    return e.preventDefault()
    // debug({ x, y })
    const el = e.target
    const oldX = el.oldX || 0
    const oldY = el.oldY || 0
    let newX = e.clientX
    let newY = e.clientY

    // // Firefox shim
    // document.ondragover = function (event) {
    //   event = event || window.event
    //   newX = event.pageX
    //   newY = event.pageY
    //   console.log('ff drag', { x, y, newX, newY })
    //   if (newX !== oldX) x = newX
    //   if (newY !== oldY) y = newY
    // }
    // console.log('drag', { x, y, newX, newY })
    // console.log(e)

    if (newX !== oldX) x = newX
    if (newY !== oldY) y = newY

  })
}
