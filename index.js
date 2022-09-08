require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const path = require('path')


app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use('/', express.static(path.join(__dirname, 'public')))