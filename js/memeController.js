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
    window.addEventListener('resize', resizeCanvas)
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
}

function drawAllLines() {
    const lines = getLines()
    setTimeout(() => {
        lines.forEach(line => {
            drawText(line.pos.x, line.pos.y, line.txt, line.size, line.strokeColor, line.fillColor, line.fontFamily, line)
        })
    }, 0.0000001)
}

function drawSelectedLine() {
    const selectedLine = getSelectedLine()
    if (selectedLine === undefined) return
    const { pos, txt, size, strokeColor, fillColor, fontFamily } = selectedLine
    setTimeout(() => {
        drawText(pos.x, pos.y, txt, size, strokeColor, fillColor, fontFamily, selectedLine)
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

function drawText(x, y, txt, size, strokeColor, fillColor, fontFamily, line) {
    gCtx.lineWidth = 1
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${fontFamily}`
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

function onFontIncreaseLine() {
    increaseFontSize()
    renderMeme()
}

function onFontDecreaseLine() {
    decreaseFontSize()
    renderMeme()
}

function onLineAlignLeft() {
    lineAlignLeft()
    renderMeme()
}

function onLineAlignCenter() {
    lineAlignCenter()
    renderMeme()
}

function onLineAlignRight() {
    lineAlignRight()
    renderMeme()
}

function onLineMoveUp() {
    lineMoveUp()
    renderMeme()
}

function onLineMoveDown() {
    lineMoveDown()
    renderMeme()
}

function onLineDelete() {
    lineDelete()
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

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)
    renderMeme()
}

function onImgSelect(elBtn) {
    const imgId = elBtn.dataset.imageId
    setSelectedImg(imgId)
    renderMeme()
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.gallery-link').classList.remove('active')
    document.querySelector('.gallery-h1').classList.add('hidden')
}

function showGallery() {
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.gallery-link').classList.add('active')
    document.querySelector('.gallery-h1').classList.remove('hidden')
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
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

function resizeCanvas() {
    if (window.innerWidth < 600) {
        gElCanvas.width = 250
        gElCanvas.height = 250
        renderMeme()
    } else {
        gElCanvas.width = 500
        gElCanvas.height = 500
        renderMeme()
    }
}