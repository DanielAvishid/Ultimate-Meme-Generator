'use strict'

renderGallery()

function renderGallery() {
    const gallery = getImgs()

    console.log(gallery)
    let strHTML = gallery.map(img =>
        `
        <div class="img-container">
    <img data-image-id="${img.id}" src="${img.url}" onclick="onImgSelect(this)">
    </div>
    `
    )
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTML.join('')
}
