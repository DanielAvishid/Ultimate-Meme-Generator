'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny'] }
]

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
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    currLine.txt = txt
}

function setLineDrag(isDrag) {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    currLine.isDrag = isDrag
}

function moveSelectedLine(dx, dy) {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    currLine.pos.x += dx
    currLine.pos.y += dy
}

function getSelectedLine() {
    const currLineIdx = gMeme.selectedLineIdx
    return gMeme.lines[currLineIdx]
}

function isTextClicked(clickedPos) {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    return clickedPos.x <= gCtx.measureText(currLine.txt)
}

function addLine() {
    const newLine = _createLine()
    gMeme.lines.push(newLine)
}

function _createLine(txt = 'Enter txt here', color = 'black', size = '20') {
    return {
        txt,
        color,
        size,
        isDrag: false
    }
}

function getImgById(imgId) {
    return gImgs.find(img => imgId === +img.id)
}

// function getLineByIdx(lineIdx) {
//     const currLine = gMeme.lines[lineIdx]
//     return {
//         txt: currLine.txt,
//         color: currLine.color,
//         size: currLine.size,
//         isDrag: false
//     }
// }

function setLineColor(color) {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    currLine.color = color
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx > gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    }
}

function increaseFontSize() {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    if (currLine.size > 200) return
    currLine.size += 4
}

function decreaseFontSize() {
    const currLineIdx = gMeme.selectedLineIdx
    const currLine = gMeme.lines[currLineIdx]
    if (currLine.size <= 4) return
    currLine.size -= 4
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}