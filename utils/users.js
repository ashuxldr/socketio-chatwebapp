const users = [];
function userJoin(id, username, room) {
    const user = {
        id, username, room
    }
    users.push(user)
    return user
}

function currUser(id) {
    return users.find(user => user.id === id)
}

// function removeUser(id) {
//     users.pop(user => user.id === id)
// }

// adding user to side list

// removing user from side list
function userLeave(id) {
    const index = users.findIndex(user => user.id === id)
    if (index !== -1)
        return users.splice(index, 1)[0]
}

function roomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = { userJoin, userLeave, roomUsers }