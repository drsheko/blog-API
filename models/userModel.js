var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const userSchema = new Schema({
    username:{type:String,minLength:3,required:true},
    password:{type:String,minLength:6,required:true},
    posts:{ type: Schema.Types.ObjectId, ref:"post"}
})


module.exports = mongoose.model('user',userSchema,'users');