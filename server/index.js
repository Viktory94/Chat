const express = require('express')
const app = express()
const PORT = 5000

const http = require('http').Server(app)
const cors = require('cors')
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:5173'
    }
})

app.get('api', (req, res) => {
    res.json({
        message: 'Hello'
    })
})

const users = []



socketIO.on('connect', (socket) => {
    console.log(`${socket.id} is connected`)
    socket.on('message', (data) => {
        socketIO.emit('response', data)
    })

    socket.on('typing', (data) => socket.broadcast.emit('responseTyping', data))

    socket.on('newUser', (data) => {
        users.push(data)
        socketIO.emit('responseNewUser', users)
    })

    socket.on('disconnect', () => {
    console.log(`${socket.id} disconnect`)
    })
})

http.listen(PORT, () => {
    console.log('Server works')
}) 