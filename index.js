require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const path = require('path')
const socketIo = require('socket.io')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use('/', express.static(path.join(__dirname, 'public')))

const server = app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`)
})

const messages = []

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('New connection')
  socket.on('new_message', (data) => {
    messages.push(data.msg)

    io.emit('update_messages', messages)
  })
})


