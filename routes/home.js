const { Router } = require('express')
const router = Router()
const fs = require('fs')

const source = __dirname + '/../resource/source.txt'
const modified = __dirname + '/../resource/modified.txt'

router.get('/', (req, res) => {
    res.render('index.html')
})

router.post('/modified', (req, res) => {
    if (!fs.existsSync(modified)) {
        fs.appendFile(modified, '', () => '')
    }

    let input = req.body.input
    let mode = req.body.option

    switch (mode) {
        case 'full':
            fs.writeFileSync(modified, input)
            break;
        case 'even':
            let splitInput = input.split('\n')
            let res = [];
            for (let i = 0; i < splitInput.length; i++) {
                if ((i + 1) % 2 == 0) {
                    res.push(splitInput[i])
                }
            }

            fs.writeFileSync(modified, res.join('\n'))
            break;
        case 'odd':
            let splitInputOdd = input.split('\n')
            let resOdd = [];
            for (let i = 0; i < splitInputOdd.length; i++) {
                if ((i + 1) % 2 != 0) {
                    resOdd.push(splitInputOdd[i])
                }
            }

            fs.writeFileSync(modified, resOdd.join('\n'))
    }

    let content = fs.readFileSync(modified, 'utf8')
    res.json({ text: content })
})

router.post('/source', (req, res) => {
    if (!fs.existsSync(source)) {
        fs.appendFile(source, '', () => '')
    }

    let input = req.body.input
    fs.writeFileSync(source, input)

    let content = fs.readFileSync(source, 'utf8')
    res.json({ text: content })
})

module.exports = router