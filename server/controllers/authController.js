const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtSecret = 'Shresth';

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

        let user = User.findOne({username});
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

module.exports = {registerUser,loginUser,getAuthUser};
