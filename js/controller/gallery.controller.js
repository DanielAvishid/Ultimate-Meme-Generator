'use strict'

function renderGallery() {
    const gallery = getImgs()
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
