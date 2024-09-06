const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); 
const authRoute = require("./routes/authroutes");
const Message = require('./models/message');  

const app = express();
app.use(express.json());
require('dotenv').config();
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is  connected successfully"))
.catch((err) => console.error(err));
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
io.on('connection', async (socket) => {
  console.log('A user connected:', socket.id);

  // Fetch and send previous messages when the client connects
  try {
    const messages = await Message.find().sort({ timestamp: 1 });  // Fetch all messages sorted by timestamp
    socket.emit('previousMessages', messages);  // Send previous messages to the client
  } catch (err) {
    console.error('Error fetching messages:', err);
  }

  socket.on('sendMessage', async (message) => {
    const newMessage = new Message({
      content: message.content,
      sender: message.sender
    });

    try {
      const savedMessage = await newMessage.save();
      io.emit('receiveMessage', savedMessage);  // Emit saved message to all clients
    } catch (err) {
      console.error('Error saving message:', err);
    }
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
