'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny'] }
]

var gY = 300

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        _createLine(250, 100, 'Hey mister Police Man', '#000000', '#ffc0cb', 30,),
        _createLine(250, 200, 'I sometimes eat Falafel', '#000000', '#ff0000', 30),
    ]
}

var gSelectedPos

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function isLineClicked(clickedPos) {
    const lines = getLines()
    const clickedLine = lines.find(line => clickedPos.x > line.location.minX && clickedPos.x < line.location.maxX && clickedPos.y > line.location.minY && clickedPos.y < line.location.maxY)
    if (!clickedLine) return false
    const clickedLineIdx = lines.findIndex(line => line === clickedLine)
    setSelectedLine(clickedLineIdx)
    document.querySelector('.txt-input').value = clickedLine.txt
    document.querySelector('.stroke-color-input').value = clickedLine.strokeColor
    document.querySelector('.fill-color-input').value = clickedLine.fillColor
    return true
}

function setLineTxt(txt) {
    const selectedLine = getSelectedLine()
    if (!txt) selectedLine.txt = 'Add text here'
    else selectedLine.txt = txt
}

function setLineDrag(isDrag) {
    const selectedLine = getSelectedLine()
    selectedLine.isDrag = isDrag
}

function moveSelectedLine(dx, dy) {
    const selectedLine = getSelectedLine()
    selectedLine.pos.x += dx
    selectedLine.pos.y += dy
}

function setLineSelectPos(x, y, size, width, line) {
    line.location = {
        minX: x - width / 2,
        maxX: x - width / 2 + width + 20,
        minY: y - size / 2,
        maxY: y - size / 2 + size + 20
    }
}

function addLine() {
    const newLine = _createLine(250, gY)
    gY += 100
    gMeme.lines.push(newLine)
}

function _createLine(x, y, txt = 'Enter txt here', strokeColor = '#000000', fillColor = '#ffff00', size = 30, isDrag = false) {
    const newLine = {
        pos: { x: x, y: y },
        txt,
        strokeColor,
        fillColor,
        size: size,
        isDrag
    }
    return newLine
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === +img.id)
}

function setLineStrokeColor(color) {
    const selectedLine = getSelectedLine()
    selectedLine.strokeColor = color
}

function setLineFillColor(color) {
    const selectedLine = getSelectedLine()
    selectedLine.fillColor = color
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
}

function increaseFontSize() {
    const selectedLine = getSelectedLine()

    if (selectedLine.size > 48) return
    selectedLine.size += 4
}

function decreaseFontSize() {
    const selectedLine = getSelectedLine()

    if (selectedLine.size <= 4) return
    selectedLine.size -= 4
}

function setSelectedLine(lineIdx) {
    gMeme.selectedLineIdx = lineIdx
}

function setSelectedImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getLines() {
    return gMeme.lines
}

function getSelectedLine() {
    const currLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[currLineIdx]
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}