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
        }).save(async(err,savedComment)=>{
            if(err){return res.status(401).json({'errors':err})}
            var thisPost = await Post.findByIdAndUpdate(postId,{
                $push:{
                    comments :savedComment._id
                }
            })
            return res.json({'success':'Comment has benn created'})
        })
    }
]