'use strict'

renderGallery()

function renderGallery() {
    const gallery = getImgs()
    let strHTML = `
    <img data-image-id="${gallery[0].id}" src="${gallery[0].url}" onclick="onImgSelect(this)">
    <img data-image-id="${gallery[1].id}" src="${gallery[1].url}" onclick="onImgSelect(this)">
    `
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTML
}