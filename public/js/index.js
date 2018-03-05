const socket = io();

socket.on('connect', function() {
    console.log('connected to SERVER');

    // sending 'client_tx' event to server
    socket.emit('client_tx', {
        from: 'from client',
        text: 'Hello, this is the client'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from SERVER')
});

// listening to 'server_tx' event from server
socket.on('server_tx', function(msg) {
    console.log('received from server', msg);
});