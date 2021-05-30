const express = require('express')
const app = express()

bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const routes = require('./routes')

module.exports = (port) => app.listen(port, () =>  console.log(`Backend started at http://localhost:${port}`) )
