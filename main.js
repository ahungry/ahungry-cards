let mouseX = 0
let mouseY = 0
let x = 0
let y = 0
let z = 0

document.addEventListener('mousedown', (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

const els = document.querySelectorAll('.card')

for (let i = 0; i < els.length; i++) {
  const el = els[i]

  // TODO: Think about how to provide similar D&D for this.
  el.addEventListener('touchstart', (e) => {
    // el.dispatchEvent(new Event('dragstart'))
  })

  el.addEventListener('touchmove', (e) => {
    // el.dispatchEvent(new Event('drag'))
  })

  el.addEventListener('touchend', (e) => {
    // el.dispatchEvent(new Event('dragend'))
  })

  el.addEventListener('mousedown', (e) => {
    const clickCount = el.clicked || 0
    el.clicked = clickCount + 1

    if (el.clicked >= 2) alert('activate it...')
    setTimeout(() => { el.clicked = 0 }, 500)
  })

  el.addEventListener('dragstart', (e) => {
    const x = e.target.offsetLeft
    const y = e.target.offsetTop
  })

  el.addEventListener('dragend', (e) => {
    const offsetX = (mouseX - el.offsetLeft)
    const offsetY = (mouseY - el.offsetTop)

    el.style.left = x - offsetX + 'px' // rect.left
    el.style.top = y - offsetY + 'px' // rect.top
    el.style.zIndex = z++
    el.oldX = 0
    el.oldY = 0
  })

  el.addEventListener('drag', (e) => {
    const el = e.target
    const oldX = el.oldX || 0
    const oldY = el.oldY || 0
    const newX = e.clientX
    const newY = e.clientY

    if (newX !== oldX) x = newX
    if (newY !== oldY) y = newY
  })
}