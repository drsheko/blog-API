const Comment =require('../models/commentModel');
const mongoose = require('mongoose') ;
const {body ,validationResult} = require('express-validator');
const Post = require('../models/postModel');

exports.create_comment_post = [
    body('text').trim().isLength({min:1}).escape().withMessage('Comment cant be empty'),
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(401).json({'errors':errors.errors })
        }
        const userId = req.user._id;
        const postId = req.params.postid;
        console.log(postId)
        const newComment = new Comment({
           user: userId,
           text:req.body.text ,
           post:postId,
           timestamp: new Date()
        }).save(async(err,savedComment)=>{
            if(err){return res.status(401).json({'errors':err})}
            var thisPost = await Post.findByIdAndUpdate(postId,{
                $push:{
                    comments :savedComment._id
                }
            })
            return res.json({'success':'Comment has benn created','data':savedComment})
        })
    }
]

exports.edit_comment = async(req,res)=>{
    var id = req.params.commentid;
    Comment.findByIdAndUpdate(id,{
        $set:{
            text:req.body.text
            }
        },
        (err,result)=>{
            if(err){ return res.status(401).json({'errors':err});
            }else{
                return res.json({'success':'comment has been edited','data':result})
            }  
        }
    )
}


exports.get_allCommentsOfPost = async(req,res)=>{
    var postId = req.params.postid
    
    Post.findById(postId,{'comments':1})
        .populate({
            path:'comments',
            // sorting based on property of populated field(path)
            options:{sort:{'timestamp':-1}}
        })
        .exec((err,result)=>{
            if(err){ return res.status(401).json({'errors':err})
            }else{
                return res.json({'success':'success','data':result})
            }
        })
}