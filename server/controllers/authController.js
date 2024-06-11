const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = 'Shresth';
const Message = require('../models/Message');

const registerUser = async(req,res) =>{
    const {email,username,password} = req.body;

    try {
        
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'user already exists'});
        }

        user = new User({email,username,password});

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        //JWT token
        const payload = {
            user:{
                id:user.id,
            }
        }

        jwt.sign(payload,jwtSecret,(err,token)=>{
            if (err) throw err;
            res.json({token});
        })
    }
    
    catch (error) {
        console.log(error);
    }
}

const loginUser = async(req,res)=>{
    const {username,password} = req.body;

    try {

        let user = await User.findOne({username});
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
              id: user.id,
            },
        };

        jwt.sign(payload,jwtSecret,(err,token)=>{
            if(err) throw err;
            res.json({token});
        })
        
    } catch (error) {
        console.log(error)
    }
}


    const getAuthUser = async(req,res) =>{
        try {
            const user = await User.findById(req.user.id).select('-password');
            res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
        }

    const getUsers = async(req,res) =>{
        try {
            const users = await User.find().select('username');
            res.json(users);
        } catch (error) {
            console.log(error)
        }
    }

    const getMessage = async(req,res) =>{
        try {
            const message = await Message.find({user:req.user.id}).populate('user','username');
            res.json(message);  
        } catch (error) {
            console.log(error)
        }
    }

    const postMessage = async(req,res)=>{
        try {
            const newMessage = new Message({
                user:req.user.id,
                text:req.body.text
            }) 

            const message = await newMessage.save();
            res.json(message);
        } catch (error) {
            console.log(error)
        }
    }


module.exports = {registerUser,loginUser,getAuthUser,getUsers,getMessage,postMessage};
