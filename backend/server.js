const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS
const authRoute = require("./routes/authroutes");
const app = express();
const server = http.createServer(app);

// Allow CORS
app.use(cors({
  origin: 'http://localhost:3000', // URL of your frontend
  methods: ['GET', 'POST'], // HTTP methods allowed
  credentials: true, // Allow credentials like cookies, authorization headers, etc.
}));

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // URL of your frontend
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.io connection setup
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Message received:', message);
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// route
app.use("/api/auth", authRoute);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
