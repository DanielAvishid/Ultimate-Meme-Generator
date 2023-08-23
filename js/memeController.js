'use strict'

let gElCanvas
let gCtx
let gStartPos

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
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    console.log(pos)

    // if (!isTextClicked(pos)) return

    // setLineDrag(true)
    // gStartPos = pos
}

function onMove(ev) {
    // const { isDrag } = getSelectedLine()
    // if (!isDrag) return

    // const pos = getEvPos(ev)

    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveSelectedLine(dx, dy)

    // gStartPos = pos

    // renderMeme()
}

function onUp(ev) {

}

function drawRectOnSelected(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = "4";
    gCtx.strokeStyle = "black";
    gCtx.rect(100, 300, gCtx.measureText(selected.txt), selected.size);
    gCtx.stroke();
}

function renderMeme() {
    const memes = getMeme()
    const currImg = getImgById(+memes.selectedImgId)
    drawImg(currImg)

    drawAllLines()
}

function drawAllLines() {
    const lines = getLines()
    setTimeout(() => {
        lines.forEach(line => {
            drawText(line.pos.x, line.pos.y, line.txt, line.size, line.color)
            drawRectOnSelected(line.pos.x, line.pos.y)
        })
    }, 0.00001);
}

function drawText(x, y, txt, size, color) {
    console.log(txt)
    gCtx.lineWidth = 1
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawImg(img) {
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawRect(x, y) {
    gCtx.strokeStyle = 'brown'
    gCtx.strokeRect(x, y, 120, 120)
    gCtx.fillStyle = 'orange'
    gCtx.fillRect(x, y, 120, 120)
}

function drawText(x, y, txt, size, color) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = color
    gCtx.fillStyle = color
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
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
    setSelectedImg(imgId)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
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