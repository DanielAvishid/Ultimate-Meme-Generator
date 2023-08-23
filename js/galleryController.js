'use strict'

renderGallery()

function renderGallery() {
    const gallery = getImgs()
    let strHTML = `
    <img src="${gallery[0].url}" onclick="onImgSelect(this.src)">
    <img src="${gallery[1].url}" onclick="onImgSelect(this.src)">
    `
    const elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHTML
}