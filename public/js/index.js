var socket = io();

socket.on('connect', function () {
    console.log("Connected to the server");

    socket.emit('createMessage', {
        from: "jane@example.com",
        text: "Hey There"
    });
});

socket.on('disconnect', function () {
    console.log("Disconnected from Server");
});

socket.on('newMessage', function(message) {
    console.log("New Message", message);
});