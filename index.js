const express = require('express')
const path = require('path')
const homeRoutes = require('./routes/home')

const app = express()

const PORT = 3000

app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRoutes)

app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})