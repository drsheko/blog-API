var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema({
    user:{type:Schema.Types.ObjectId , ref:'user'},
    title:{type:String, minLength:1 , required:true},
    text:{type:String, minLength:1 , required:true},
    comments:[{type:Schema.Types.ObjectId ,ref : 'comment'}],
    isPublished:{type:Boolean,default:true},
    picture:{type:String, default : 'blog.webp'},
    likes : {type:Array , default : []},
    dislikes : { type :Array , default: []},
    timestamp:{type:Date, default:new Date()}
});

module.exports = mongoose.model('post',postSchema,'posts');