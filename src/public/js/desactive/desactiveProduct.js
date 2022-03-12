'use strict'
const changeButtons = document.querySelectorAll('.change')

changeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        const options = {
            method: 'PATCH',
            headers: { "Content-Type": "application/json" }
        }
        await fetch(`/products/${button.value}`, options)
    })
})