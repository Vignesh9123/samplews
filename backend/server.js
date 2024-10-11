const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // Allow all origins for testing
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Emit an event to the client
    socket.emit('welcome', { message: 'Welcome to the Socket.io server!' });

    // Listen for events from the client
    socket.on('clientEvent', (data) => {
        console.log('Received from client:', data);
        // Respond back to client
        socket.emit('serverEvent', { message: `Server received your data: ${data.message}` });
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

app.get('/', (req, res) => {
    res.send('Socket.io backend is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
