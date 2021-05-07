const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const formatMessage = require('./utils/messages');
const { userJoin, removeUser, roomUsers, userLeave } = require('./utils/users')
const botname = "ChatBoy";

const port = 3000 || process.env.PORT;



io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)


        socket.emit('message', formatMessage(botname, "Welcome to the Local Messenging Web App!"));

        socket.broadcast.to(user.room).emit('message', formatMessage(botname, `${user.username} has joined the chat`));

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: roomUsers(user.room)
        })


        socket.on('chatMessage', msg => {
            io.emit('message', formatMessage(user.username, msg))
        })


        socket.on('disconnect', () => {

            const user = userLeave(socket.id)
            if (user) {
                io.to(user.room).emit('message', formatMessage(botname, `${user.username} has exit the chat`))
            }
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: roomUsers(user.room)
            })
        })


    })
});


app.use(express.static(path.join(__dirname, 'public')));

server.listen(port, () => {
    console.log(`server is running at ${port}`)
})
