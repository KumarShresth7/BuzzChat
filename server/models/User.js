const mongooose = require('mongoose');

const UserSchema = new mongooose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


module.exports = mongooose.model('User',UserSchema);