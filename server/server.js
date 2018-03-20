const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const port = process.env.PORT || 3000;

var publicPath = path.join(__dirname , '../public');
var app = express();

var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New User Connected");

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user joined the char app'));

    socket.on('createMessage', (message, callback) => {
        console.log("createMessage", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback(message);
    });

    socket.on('disconnect' , () => {
        console.log("User Disconnected");
    });
});

server.listen(port, () => {
    console.log(`Port is up on port ${port}`);
})