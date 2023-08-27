// 'use strict'

// var gCanvasIdx = 1

// renderSavedMemes()

// function renderSavedMemes() {
//     const savedMemes = loadFromStorage('savedMemesDB')
//     let strHTML = savedMemes.map(meme => {
//         `
//         <div class="canvas-container">
//         <canvas class="canvas${gCanvasIdx}" width="250" height="250">
//         </canvas>
//     `
//         gElCanvas = document.querySelector(`.canvas${gCanvasIdx}`)
//         gMeme = meme
//         DrawMemeClean()
//     }
//     )
//     const elGallery = document.querySelector('.saved-container')
//     elGallery.innerHTML = strHTML.join('')
// }