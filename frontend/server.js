const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.HTTP_PORT || 8083;

// Setup Express
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT}`);
});

// Setup Socket.IO
const io = socketIo(server);

// Load protobuf
const PROTO_PATH = path.join(__dirname, '..', 'chat.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const chat_proto = grpc.loadPackageDefinition(packageDefinition).chat;

// Create gRPC client
const client = new chat_proto.ChatService(
    `localhost:${process.env.GRPC_PORT || 50053}`,
    grpc.credentials.createInsecure()
);

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('chat message', (msg) => {
        console.log('Message received:', msg);

        // Call gRPC service
        client.SendMessage({ message: msg }, (error, response) => {
            if (error) {
                console.error('Error:', error);
                socket.emit('error', error.message);
            } else {
                console.log('Response:', response);
                socket.emit('chat response', response.response);
            }
        });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
}); 