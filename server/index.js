const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes.js');
const messageRoutes = require('./routes/messagesRoutes.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://buzz-chat-frontend-six.vercel.app",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: 'https://buzz-chat-frontend-six.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

mongoose.connect('mongodb+srv://kumarshresth2004:Shresth%40123@cluster0.lly1dz4.mongodb.net/chatapp');

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
