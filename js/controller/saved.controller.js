'use strict'

var gMemeIdx = 1

function renderSavedMemes(savedMemes) {
    if (!savedMemes || !savedMemes.length) return
    let strHTML = savedMemes.map(meme =>
        `
        <div class="canvas-container">
            <canvas class="canvas${gMemeIdx}" data-meme="${gMemeIdx++}" onclick="onCanvasClick(this)" width="250" height="250">
            </canvas>
            </div>
    `
    )
    gMemeIdx = 1
    const elSaved = document.querySelector('.saved-container')
    elSaved.innerHTML = strHTML.join('')
    drawSavedMemes(savedMemes)
    gMemeIdx = 1
}

function drawSavedMemes(savedMemes) {
    savedMemes.forEach(meme => {
        const elCanvas = document.querySelector(`.canvas${gMemeIdx++}`)
        const ctx = elCanvas.getContext('2d')
        const currImg = getImgById(+meme.selectedImgId)
        const elImg = new Image()
        elImg.src = currImg.url
        elImg.onload = () => {
            ctx.drawImage(elImg, 0, 0, elCanvas.width, elCanvas.height)
        }
        setTimeout(() => {
            meme.lines.forEach(line => {
                ctx.lineWidth = 1
                ctx.strokeStyle = line.strokeColor
                ctx.fillStyle = line.fillColor
                ctx.font = `${line.size / 2}px ${line.fontFamily}`
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(line.txt, line.pos.x / 2, line.pos.y / 2)
                ctx.strokeText(line.txt, line.pos.x / 2, line.pos.y / 2)
                const width = ctx.measureText(line.txt).width
                line.location = {
                    minX: line.pos.x - width / 2,
                    maxX: line.pos.x - width / 2 + width + 20,
                    minY: line.pos.y - line.size / 2,
                    maxY: line.pos.y - line.size / 2 + line.size + 20
                }
            })
        }, 0.100)
    })
}



