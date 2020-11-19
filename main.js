let activeEl
let mouseX = 0
let mouseY = 0
let x = 0
let y = 0
let z = 0

let lastM = ''
function debug (m) {
  if (m === lastM) return
  document.getElementById('debug').innerHTML = JSON.stringify(m)
  lastM = m
}

setInterval(() => {
  document.getElementById('debug').innerHTML = ''
}, 10000)

document.addEventListener('mousedown', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

document.addEventListener('mousemove', (e) => {
  debug({ x: e.pageX, y: e.pageY })
})

document.ondragover = function (event) {
  event = event || window.event
  newX = event.pageX
  newY = event.pageY
  // console.log('ff drag', { x, y, newX, newY })

  const oldX = activeEl.oldX || 0
  const oldY = activeEl.oldY || 0

  if (newX !== oldX) x = newX
  if (newY !== oldY) y = newY
  debug({ newX, newY })
}

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

    const clickCount = el.clicked || 0
    el.clicked = clickCount + 1
    debug(clickCount)

    setTimeout(() => { el.clicked = 0 }, 500)
    if (el.clicked >= 2) alert('activate it...')
  })

  el.addEventListener('touchmove', (e) => {
    // debug('touchmove')
    e.preventDefault()
    // el.dispatchEvent(new Event('drag'))

    const el = e.target
    const oldX = el.oldX || 0
    const oldY = el.oldY || 0
    const newX = e.touches[0].clientX
    const newY = e.touches[0].clientY

    if (newX !== oldX) x = newX
    if (newY !== oldY) y = newY

    // el.style.left = x - 50 + 'px' // rect.left
    // el.style.top = y - 50 + 'px' // rect.top
  })

  el.addEventListener('touchend', (e) => {
    // debug('touchend')
    e.preventDefault()
    // el.dispatchEvent(new Event('dragend'))
    // el.style.left = '50px'
    // el.style.top = '50px'

    const offsetX = (mouseX - el.offsetLeft)
    const offsetY = (mouseY - el.offsetTop)

    el.style.left = x - offsetX + 'px' // rect.left
    el.style.top = y - offsetY + 'px' // rect.top

    el.style.zIndex = z++
    el.oldX = 0
    el.oldY = 0
  })

  el.addEventListener('mousedown', (e) => {
    debug('mousedown')
    const clickCount = el.clicked || 0
    el.clicked = clickCount + 1

    if (el.clicked >= 2) alert('activate it...')
    setTimeout(() => { el.clicked = 0 }, 500)
    el.style.zIndex = z++
  })

  el.addEventListener('dragstart', (e) => {
    debug('dragstart')
    activeEl = e.target
    const x = e.target.offsetLeft
    const y = e.target.offsetTop
    e.target.style.opacity = 0.5
  })

  el.addEventListener('dragend', (e) => {
    console.log(e)
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
    console.log(e)
  })

  el.addEventListener('drag', (e) => {
    debug({ x, y })
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
