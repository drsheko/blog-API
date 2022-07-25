var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{type:Schema.Types.ObjectId , ref:'user'},
    title:{type:String, minLength:1 , required:true},
    text:{type:String, minLength:1 , required:true},
    comments:{type:Schema.Types.ObjectId ,ref : 'comment'},
    isPublished:{type:Boolean,default:true},
    timestamp:{type:Date, default:new Date()}
});

module.exports = mongoose.model('post',postSchema,'posts');