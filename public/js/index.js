var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server");
});

socket.on('disconnect', function () {
    console.log("Disconnected from Server");
});

socket.on('newMessage', function(message) {
    console.log("New Message", message);
});