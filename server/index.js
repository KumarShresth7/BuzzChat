const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/chatapp')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.listen(5000,()=>console.log(`Server running at port 5000`));

