'use strict'

let gElCanvas
let gCtx
let gClickPos

let gX1 = 250
let gY2 = 100
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    gElCanvas = document.querySelector('.main-canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', resizeCanvas)
    DrawMeme()
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
        DrawMemeClean()
        return
    }
    DrawMeme()
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

    DrawMeme()
}

function onUp() {
    setLineDrag(false)
}

//////////////////////////////////////////////////////////////////////////////////////////////

function DrawMeme() {
    drawSelectedImg()
    drawAllLines()
    drawSelectedLine()
}

function DrawMemeClean() {
    const memes = getMemes()
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

function drawSelectedImg() {
    const memes = getMemes()
    const currImg = getImgById(+memes.selectedImgId)
    drawImg(currImg)
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

///////////////////////////////////////////////////////////////////////////////////////////

function drawImg(img) {
    const elImg = new Image()
    elImg.src = img.url
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    }
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

function drawRect(x, y, txt, size) {
    const width = gCtx.measureText(txt).width
    gCtx.lineWidth = 3
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(x - width / 2 - 10, y - size / 2 - 10, width + 20, size + 20)
}

///////////////////////////////////////////////////////////////////////////////

function onChangeStrokeColor(color) {
    setLineStrokeColor(color)
    DrawMeme()
}

function onAddLine() {
    addLine()
    DrawMeme()
}

function onSwitchLine() {
    switchLine()
    DrawMeme()
}

function onChangeFillColor(color) {
    setLineFillColor(color)
    DrawMeme()
}

function onFontIncreaseLine() {
    increaseFontSize()
    DrawMeme()
}

function onFontDecreaseLine() {
    decreaseFontSize()
    DrawMeme()
}

function onLineAlignLeft() {
    lineAlignLeft()
    DrawMeme()
}

function onLineAlignCenter() {
    lineAlignCenter()
    DrawMeme()
}

function onLineAlignRight() {
    lineAlignRight()
    DrawMeme()
}

function onLineMoveUp() {
    lineMoveUp()
    DrawMeme()
}

function onLineMoveDown() {
    lineMoveDown()
    DrawMeme()
}

function onLineDelete() {
    lineDelete()
    DrawMeme()
}

function onSaveMeme() {
    saveMeme()
}

function onDownloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    elLink.download = 'my-meme'
}

function onTxtChange(txt) {
    setLineTxt(txt)
    DrawMeme()
}

function onSetFontFamily(fontFamily) {
    setFontFamily(fontFamily)
    DrawMeme()
}

function onImgSelect(elBtn) {
    const imgId = elBtn.dataset.imageId
    setSelectedImg(imgId)
    resizeCanvas()
    DrawMeme()
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.gallery-link').classList.remove('active')
    document.querySelector('.gallery-header').classList.add('hidden')
}

function onRandomMeme() {
    const randomLine = createRandomMeme()
    const newLines = [randomLine]
    gMeme.lines = newLines
    resizeCanvas()
    DrawMeme()
    document.querySelector('.editor-container').classList.remove('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.gallery-link').classList.remove('active')
    document.querySelector('.gallery-header').classList.add('hidden')
}

///////////////////////////////////////////////////////////////////////////////

function showGallery() {
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.gallery-container').classList.remove('hidden')
    document.querySelector('.gallery-link').classList.add('active')
    document.querySelector('.gallery-header').classList.remove('hidden')
}

function showSavedGallery() {
    document.querySelector('.editor-container').classList.add('hidden')
    document.querySelector('.gallery-container').classList.add('hidden')
    document.querySelector('.gallery-link').classList.remove('active')
    document.querySelector('.gallery-header').classList.remove('hidden')
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
        gElCanvas.width = 350
        gElCanvas.height = 350
        DrawMeme()
    } else {
        gElCanvas.width = 500
        gElCanvas.height = 500
        DrawMeme()
    }
}