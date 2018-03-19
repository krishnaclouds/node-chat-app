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