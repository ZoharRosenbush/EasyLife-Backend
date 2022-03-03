var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('member updated customers', () => {
            socket.broadcast.emit('customer was updated')
        })
        socket.on('member updated transactions', () => {
            socket.broadcast.emit('transaction was updated')
        })
    })
}

module.exports = {
    connectSockets,
}