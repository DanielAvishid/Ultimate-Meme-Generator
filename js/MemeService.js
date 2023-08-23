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
        {
            pos: { x: 250, y: 100 },
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red',
            isDrag: false
        },
        {
            pos: { x: 250, y: 200 },
            txt: 'Hey mister Police Man',
            size: 30,
            color: 'pink',
            isDrag: false
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

function setLineTxt(txt) {
    const selectedLine = getSelectedLine()
    selectedLine.txt = txt
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

function isTextClicked(clickedPos) {
    const selectedLine = getSelectedLine()
    // return clickedPos.x <= gCtx.measureText(selectedLine.txt) && clickedPos.y <= selectedLine.size
}

function addLine() {
    const newLine = _createLine()
    gMeme.lines.push(newLine)
}

function _createLine(txt = 'Enter txt here', color = 'yellow', size = '20') {
    const newLine = {
        pos: { x: 250, y: gY },
        txt,
        color,
        size,
        isDrag: false
    }
    gY += 100
    return newLine
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === +img.id)
}

function setLineColor(color) {
    const selectedLine = getSelectedLine()
    selectedLine.color = color
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
}

function increaseFontSize() {
    const selectedLine = getSelectedLine()
    if (selectedLine.size > 200) return
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