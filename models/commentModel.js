var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    user:{type:Schema.Types.ObjectId , ref:'user'},
    text:{type:String, minLength:1 , required:true},
    post:{type:Schema.Types.ObjectId ,ref : 'post'},
    timestamp:{type:Date, reguired:true}
});

module.exports = mongoose.model('comment',commentSchema,'comments');