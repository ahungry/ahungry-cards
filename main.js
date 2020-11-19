let x = 0
let y = 0
let z = 0

const els = document.querySelectorAll('.card')

for (let i = 0; i < els.length; i++) {
  const el = els[i]

  el.addEventListener('dragend', (e) => {
    console.log('drag is ended, it is: ', x)
    el.style.left = (x - 50) + 'px' // rect.left
    el.style.top = (y - 50) + 'px' // rect.top
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

    console.log('vals: ', { oldX, oldY, newX, newY })

    if (newX !== oldX) x = newX
    if (newY !== oldY) y = newY
  })
}
