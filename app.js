const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
app.use(express.static(__dirname + '/public'));

const server = http.createServer(app);

// web socket server
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log(`A new client connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`The client disconnected: ${socket.id}`);
    })

    // listening to 'client_tx' event from client
    socket.on('client_tx', (msg) => {
        console.log(`Message: ${JSON.stringify(msg)} Received from client ${socket.id}`)
    })

    // sending 'server_tx" event to client
    socket.emit('server_tx', {
        from: 'From server',
        text: 'Hello, there! I am the server'
    });

});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})