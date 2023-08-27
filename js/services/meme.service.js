'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny'] },
    { id: 3, url: 'images/3.jpg', keywords: ['funny'] },
    { id: 4, url: 'images/4.jpg', keywords: ['funny'] },
    { id: 5, url: 'images/5.jpg', keywords: ['funny'] },
    { id: 6, url: 'images/6.jpg', keywords: ['funny'] },
    { id: 7, url: 'images/7.jpg', keywords: ['funny'] },
    { id: 8, url: 'images/8.jpg', keywords: ['funny'] },
    { id: 9, url: 'images/9.jpg', keywords: ['funny'] },
    { id: 10, url: 'images/10.jpg', keywords: ['funny'] },
    { id: 11, url: 'images/11.jpg', keywords: ['funny'] },
    { id: 12, url: 'images/12.jpg', keywords: ['funny'] },
    { id: 13, url: 'images/13.jpg', keywords: ['funny'] },
    { id: 14, url: 'images/14.jpg', keywords: ['funny'] },
    { id: 15, url: 'images/15.jpg', keywords: ['funny'] },
    { id: 16, url: 'images/16.jpg', keywords: ['funny'] },
    { id: 17, url: 'images/17.jpg', keywords: ['funny'] },
    { id: 19, url: 'images/18.jpg', keywords: ['funny'] },
]

var gLinesExample = [
    _createLine(250, 100, 'Js is so fun!', '#000000', '#ffc0cb', 'impact', 30),
    _createLine(250, 100, 'Mister PoliceMan', '#000000', '#ffc0cb', 'impact', 30),
    _createLine(250, 100, 'I eat falafel all day', '#000000', '#ffc0cb', 'impact', 30),
    _createLine(250, 100, 'i Love JS', '#000000', '#ffc0cb', 'impact', 30),
    _createLine(250, 100, 'Can we replace JS: NO!', '#000000', '#ffc0cb', 'impact', 30),
]

var gY = 250

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        _createLine(250, 50, 'Enter Text', '#000000', '#ffc0cb', 'impact', 40),
        _createLine(250, 150, 'Enter Text', '#000000', '#ff0000', 'impact', 40),
    ]
}

var gSelectedPos

var gKeywordSearchCountMap = { 'funny': 0, 'cat': 0, 'baby': 0 }

function getKeywordSearchMap() {
    return gKeywordSearchCountMap
}

function saveMeme() {
    const savedMemes = loadFromStorage('savedMemesDB')
    savedMemes.push(gMeme)
    saveToStorage('savedMemesDB', savedMemes)
}

function resetLines() {
    gMeme.lines = [
        _createLine(250, 50, 'Enter Text', '#000000', '#ffc0cb', 'impact', 40),
        _createLine(250, 150, 'Enter Text', '#000000', '#ff0000', 'impact', 40),
    ]
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
    const newLine = _createLine(250, gY, 'Enter Text', '#000000', '#ffff00', 'impact', 40)
    gY += 100
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function _createLine(x, y, txt = 'Enter txt here', strokeColor = '#000000', fillColor = '#ffff00', fontFamily = 'impact', size = 30, isDrag = false) {
    const newLine = {
        pos: { x: x, y: y },
        txt,
        strokeColor,
        fillColor,
        fontFamily,
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

function lineDelete() {
    const lineSelectedIdx = gMeme.selectedLineIdx
    gMeme.lines.splice(lineSelectedIdx, 1)
}

function lineMoveUp() {
    const selectedLine = getSelectedLine()
    selectedLine.pos.y -= 10
}

function lineMoveDown() {
    const selectedLine = getSelectedLine()
    selectedLine.pos.y += 10
}

function lineAlignLeft() {
    const selectedLine = getSelectedLine()
    const lineWidth = getMeasureTextWidth(selectedLine.txt)
    selectedLine.pos.x = 20 + (lineWidth / 2)
}

function lineAlignCenter() {
    const selectedLine = getSelectedLine()
    const elCanvas = getCanvas()
    if (elCanvas.width === 350) selectedLine.pos.x = 175
    else if (elCanvas.width === 500) selectedLine.pos.x = 250
}

function lineAlignRight() {
    const selectedLine = getSelectedLine()
    const lineWidth = getMeasureTextWidth(selectedLine.txt)
    const elCanvas = getCanvas()
    if (elCanvas.width === 350) selectedLine.pos.x = 330 - (lineWidth / 2)
    else if (elCanvas.width === 500) selectedLine.pos.x = 480 - (lineWidth / 2)
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

function setFontFamily(fontFamily) {
    const selectedLine = getSelectedLine()
    switch (fontFamily) {
        case 'impact':
            selectedLine.fontFamily = 'impact'
            break
        case 'Arial, sans-serif':
            selectedLine.fontFamily = 'Arial, sans-serif'
            break
        case 'Verdana, sans-serif':
            selectedLine.fontFamily = 'Verdana, sans-serif'
            break
        case 'Tahoma, sans-serif':
            selectedLine.fontFamily = 'Tahoma, sans-serif'
            break
        case `'Trebuchet MS', sans-serif`:
            selectedLine.fontFamily = `'Trebuchet MS', sans-serif`
            break
        case `'Times New Roman', serif`:
            selectedLine.fontFamily = `'Times New Roman', serif`
            break
        case 'Georgia, serif':
            selectedLine.fontFamily = 'Georgia, serif'
            break
        case 'garamond':
            selectedLine.fontFamily = 'garamond'
            break
        case `'Courier New', monospace`:
            selectedLine.fontFamily = `'Courier New', monospace`
            break
        case `'Brush Script MT', cursive`:
            selectedLine.fontFamily = `'Brush Script MT', cursive`
            break
    }
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

function getMemes() {
    return gMeme
}

function createRandomMeme() {
    const randomLine = gLinesExample[getRandomInt(0, gLinesExample.length)]
    const randomImg = gImgs[getRandomInt(0, gImgs.length)]
    setSelectedImg(randomImg.id)
    return randomLine
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}