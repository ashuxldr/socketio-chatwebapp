const express = require("express");
const app = express();
const path = require("path")
const http = require("http")
const server = http.createServer(app)
const port = 3000 || process.env.PORT;
const socketio = require("socket.io")
const io = socketio(server);

io.on('connection', socket => {
    console.log('NEW WS CONNECTION...')

    socket.emit('message', "welcome to the chat app")

    socket.broadcast.emit('message', 'A user has joined the chat');

    socket.on('disconnect', () => {
        io.emit('message', 'A user has exit the chat')
    })
});


app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log(`server is running at ${port}`)
})
