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
    origin: "https://buzz-chat-client.vercel.app",
    methods: ['GET', 'POST'], // Methods allowed for CORS requests
    allowedHeaders: ['Content-Type', 'Authorization'],
  }
});

// Apply CORS middleware
app.use(cors());

app.use(express.json());

// Handle CORS preflight requests
// app.options('*', cors());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`MongoDB connection error: ${err}`));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Routes
// app.use("/",(req,res)=>{
//   res.json({message:"Hello from Express App"})
// })

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
