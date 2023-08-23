'use strict'

let gElCanvas
let gCtx
let gX = 250
let gY = 100

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addMouseListeners()
    // addTouchListeners()
    renderMeme()
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function renderMeme() {
    const memes = getMeme()
    const currImgId = +memes.selectedImgId
    drawImg(currImgId)
    gY = 100
    setTimeout(() => {
        memes.lines.forEach((line) => {
            drawText(line)
        })
    }, 0.000001)
}

function drawImg(imgId) {
    const currImg = getImgById(imgId)
    const elImg = new Image()
    elImg.src = currImg.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(line) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = line.color
    gCtx.fillStyle = line.color
    gCtx.font = `${line.size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(line.txt, gX, gY)
    gCtx.strokeText(line.txt, gX, gY)
    gY += 50
}

function colorPicker(color) {
    setLineColor(color)
    renderMeme()
}

function fontIncreaseLine() {
    increaseFontSize()
    renderMeme()
}

function fontDecreaseLine() {
    decreaseFontSize()
    renderMeme()
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onTxtChange(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onImgSelect(elBtn) {
    const imgId = elBtn.dataset.imageId
    setImg(imgId)

    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
}