const User = require('../models/userModel');
const Post =require('../models/postModel');
const Comment = require('../models/commentModel')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const path = require('path');
const flash =require('connect-flash');


exports.createPost_post = [
    body('title').trim().isLength({min:1}).escape().withMessage('Post title should not be empty'),
    body('text').trim().isLength({min:1}).escape().withMessage('Post text can not be empty'),
    async(req,res)=>{
        const errors = validationResult(req)
        var postData = {
            title:req.body.title,
            text:req.body.text
        }
        if(!errors.isEmpty()){
            return res.status(401).json({
                'errors':errors.errors,
                'postData':postData
            })
        }else{
            const newPost = new Post( {
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                isPublished:true
            }).save(err=>{
                if(err){return res.json({'errors':err})}
                return res.json({'success':'Post has been created'})
            })
        }
    }

]
exports.Post_edit_get = async(req,res)=>{
    var id = req.params.id;
     var postToUpdate = await Post.findById(id )
     
     return res.json({'postToEdit':postToUpdate})
}
exports.Post_edit_post = async(req,res)=>{
    var id = req.params.id ; 
    Post.findByIdAndUpdate(id ,{
            $set:{
                title:req.body.title,
                text:req.body.text
            }
        },
        (err=>{
        if(err){return res.status(401).json({
            'errors':"Can't update the post"
        })}
        else {return res.json({'success':'Post has been updated'})}
    }))
}
exports.deletePost = async(req,res)=>{
    var id = req.params.id ; 
    Post.findByIdAndDelete(id , (err=>{
        if(err){return res.status(401).json({
            'errors':"Can't delete the post"
        })}
        else {return res.json({'success':'Post has been deleted'})}
    }))
}

exports.get_all_posts = async(req,res)=>{
    var allPosts = await Post.find().sort([['timestamp','descending']]).populate('user').populate('comments');
    res.json({'posts':allPosts})
}

exports.get_onePost = async(req,res) => {
    var id = req.params.postid
    var post = await Post.findById(id).populate('comments');
    res.json({'post':post})
}

exports.get_user_posts = async(req,res)=>{
    var userId = req.user._id;
    var userPosts = await Post.find({}).sort([['timestamp','descending']])
    .populate({
        "path": "user",
        "match": { "_id": userId }
    }).exec((err,posts)=>{
        if(err){return res.status(401).json({'errors':err})}
        posts =  posts.filter(function(post){
            return post.user !==null
        })
        return  res.json({'posts':posts})
    });
    
}