const socket = io();
const chatForm = document.getElementById('chat-form')


socket.on('message', message => {
    console.log(message)
})

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
})
