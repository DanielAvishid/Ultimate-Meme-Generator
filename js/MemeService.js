'use strict'

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat'] },
    { id: 2, url: 'images/2.jpg', keywords: ['funny'] }
]

var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'red'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gCurrImgURL = 'images/1.jpg'

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function setImg(img) {
    gCurrImgURL = img
}

function getImgs() {
    return gImgs
}

function getMeme() {
    return gMeme
}

function getCurrImgURL() {
    return gCurrImgURL
}