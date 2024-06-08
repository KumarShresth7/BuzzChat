const express = require('express');
// const io = require('socket.io') (3001);
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/auth',authRoutes);
app.use(cors({ origin: 'http://localhost:3000' }));

mongoose.connect('mongodb://localhost:27017/chatapp')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// io.on('connection',socket =>{
//     socket.emit("chat-messsage","hello world");
// })

app.listen(5000,()=>console.log(`Server running at port 5000`));

