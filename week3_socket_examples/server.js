const express = require('express');
const socketio = require('socket.io');
const path = require('path'); // To handle file paths consistently

const app = express();
const SERVER_PORT = 3000;

// Start the server
const server = app.listen(SERVER_PORT, () => {
    console.log(`Chat Server running on http://localhost:${SERVER_PORT}/`);
});

// Serve static files (optional: useful if your views include static assets like CSS or JS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'chat.html'));
});

app.get("/group", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'group_chat.html'));
});

// Initialize Socket.io
const io = socketio(server);

// Socket.io connection logic
io.on('connection', (socket) => {
    console.log(`New connection established: ${socket.id}`);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });

    // Handle simple messages
    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}: ${data}`);
    });

    // Handle chat messages (broadcast to all clients)
    socket.on('chat_message', (data) => {
        data.clientId = socket.id;
        console.log('Chat message received:', JSON.stringify(data));
        io.emit('chat_message', data); // Broadcast to all clients
    });

    // Handle group joining
    socket.on('join_group', (roomName) => {
        console.log(`User ${socket.id} joined group: ${roomName}`);
        socket.join(roomName);
    });

    // Handle group leaving
    socket.on('leave_group', (roomName) => {
        console.log(`User ${socket.id} left group: ${roomName}`);
        socket.leave(roomName);
    });

    // Handle group messages
    socket.on('group_message', (data) => {
        console.log(`User ${socket.id} sent message to group ${data.group}: ${data.message}`);
        data.clientId = socket.id;
        io.to(data.group).emit('group_message', data); // Send message to the specific group
    });
});


