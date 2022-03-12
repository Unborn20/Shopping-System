'use strict'
const form = document.querySelector('#product-form')
const input = document.querySelector(`input[type="file"]`)
const preview = document.querySelector('#preview')
const productId = form.getAttribute('name')

input.addEventListener('change', async (e) => {
    const image = e.target.files[0]
    preview.src = URL.createObjectURL(image)
    preview.onload = function() {
        URL.revokeObjectURL(preview.src) // free memory
    }
})

form.addEventListener('submit', async (e) => {
    e.preventDefault()    
    const elements = form.elements    
    const body = getValueForm(elements)
    try{
        if(input.files.length){
            const image = input.files[0]
            const imageId = await getImageId(image)
            body['imageProductId'] = imageId
        }
        const url = (!productId) ? '/products' : `/products/${productId}`
        const options = {
            method: (!productId) ? 'POST' : 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        }
        const { route } = await (await fetch(url, options)).json()
        window.location = route
    }catch(error){
        console.error('An error has ocurred', error)
    }
})

async function getImageId(image){
    const files = new FormData()
    files.append('image', image)
    const options = {
        method: 'POST',
        body: files
    }
    try{
        const response = await fetch(`/image/upload`, options)
        const { imageId } = await response.json()
        return imageId
    }catch(error){
        return new Error('An error ocurred when we try get image ID', error)
    }
}

function getValueForm(elements){
    const regex = /(submit|file)/
    return Object.keys(elements).reduce((body, field) => {
        if(isNaN(field) && !regex.test(elements[field].type)){            
            body[field] = elements[field].value
        }
        return body
    }, {})
}