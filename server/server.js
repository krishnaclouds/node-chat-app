const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname , '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.emit('newMessage', {
        from: 'Admin',
        text: "Welcome to Chat App",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: "A new use joined to chat App",
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log("createMessage", newMessage);
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect' , () => {
        console.log("User Disconnected");
    });
});

server.listen(port, () => {
    console.log(`Port is up on port ${port}`);
})