const mongooose = require('mongoose');

const UserSchema = new mongooose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongooose.model('User',UserSchema);