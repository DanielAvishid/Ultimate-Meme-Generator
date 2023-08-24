'use strict'

let gElCanvas
let gCtx
let gClickPos

let gX1 = 250
let gY2 = 100
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    renderMeme()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) {
        renderMemeNoneSelected()
        return
    }
    renderMeme()
    setLineDrag(true)
    gClickPos = pos
}

function onMove(ev) {
    const selectedLine = getSelectedLine()
    if (!selectedLine.isDrag) return
    const pos = getEvPos(ev)

    const dx = pos.x - selectedLine.pos.x
    const dy = pos.y - selectedLine.pos.y
    moveSelectedLine(dx, dy)

    renderMeme()
}

function onUp() {
    setLineDrag(false)
}

function renderMeme() {
    const memes = getMeme()
    const currImg = getImgById(+memes.selectedImgId)
    drawImg(currImg)
    drawAllLines()
    drawSelectedLine()
}

function renderMemeNoneSelected() {
    const memes = getMeme()
    const currImg = getImgById(+memes.selectedImgId)
    drawImg(currImg)
    drawAllLines()
    // drawSelectedLine()
}

function drawAllLines() {
    const lines = getLines()
    setTimeout(() => {
        lines.forEach(line => {
            drawText(line.pos.x, line.pos.y, line.txt, line.size, line.strokeColor, line.fillColor, line)
        })
    }, 0.0000001)
}

function drawSelectedLine() {
    const selectedLine = getSelectedLine()
    if (selectedLine === undefined) return
    const { pos, txt, size, strokeColor, fillColor } = selectedLine
    setTimeout(() => {
        drawText(pos.x, pos.y, txt, size, strokeColor, fillColor, selectedLine)
        drawRect(pos.x, pos.y, txt, size)
    }, 0.0000002)
}

function drawImg(img) {
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawRect(x, y, txt, size) {
    const width = gCtx.measureText(txt).width
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - width / 2 - 10, y - size / 2 - 10, width + 20, size + 20)
}

function drawText(x, y, txt, size, strokeColor, fillColor, line) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)

    const width = gCtx.measureText(txt).width
    setLineSelectPos(x, y, size, width, line)
}

function onChangeStrokeColor(color) {
    setLineStrokeColor(color)
    renderMeme()
}

function onChangeFillColor(color) {
    setLineFillColor(color)
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
    setSelectedImg(imgId)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }
    if (TOUCH_EVS.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}