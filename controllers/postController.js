const User = require('../models/userModel');
const Post =require('../models/postModel');
const Comment = require('../models/commentModel')
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const path = require('path');
const flash =require('connect-flash');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
         cb(null, path.join(__dirname, '/../client/src/images'))
    },
    filename: function (req, file, cb) {
      cb(null, 'Post'+req.body.username+ file.originalname)
    }
  })
  const upload = multer({storage:storage});

exports.createPost_post = [
    upload.single('postPhoto'),
    body('title').trim().isLength({min:1}).escape().withMessage('Post title should not be empty'),
    body('text').trim().isLength({min:1}).escape().withMessage('Post text can not be empty'),
    async(req,res)=>{console.log(req.body)
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
            var uploaded_photo;
            if(req.file){
                uploaded_photo = req.file.filename
            }
            const newPost = new Post( {
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                picture:uploaded_photo,
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

exports.like = async(req,res) => {
    var postId = req.params.postid ;
    var userId = req.body.user ;

    Post.findByIdAndUpdate(
        postId, {
            $push : {
                likes : userId
            }
        },(err ,post) => {
            if(err){return res.status(401).json({'error':err})}
            let like = post.likes[0]
            return res.status(200).json({like})
        }  
    )
}

exports.unlike = async(req,res) => {
    var postId = req.params.postid ;
    var userId = req.body.user ;

    Post.findByIdAndUpdate(
        postId, {
            $pull : {
                likes : userId
            }
        },(err ,post) => {
            if(err){return res.status(401).json({'error':err})}
            return res.status(200).json({"success":'You unliked the post '})
        }  
    )
}

exports.dislike = async(req,res) => {
    var postId = req.params.postid ;
    var userId = req.body.user ;

    Post.findByIdAndUpdate(
        postId, {
            $push : {
                dislikes : userId
            }
        },(err ,post) => {
            if(err){return res.status(401).json({'error':err})}
            let dislike = post.dislikes[0]
            return res.status(200).json({dislike})
        }  
    )
}

exports.undislike = async(req,res) => {
    var postId = req.params.postid ;
    var userId = req.body.user ;

    Post.findByIdAndUpdate(
        postId, {
            $pull : {
                dislikes : userId
            }
        },(err ,post) => {
            if(err){return res.status(401).json({'error':err})}
            return res.status(200).json({"success":'You undisliked the post '})
        }  
    )
}

exports.user_liked_post = async(req,res) => {
    var postId = req.params.postid ; 
    var userId = req.params.userid ; 
    Post.findById(postId,
        (err,post)=>{
            if (err){ return res.status(401).json({'error':err})}
            var liked = post.likes.includes(userId)
            return res.json({'liked':liked})
        })
}

exports.user_disliked_post = async(req,res) => {
    var postId = req.params.postid ; 
    var userId = req.params.userid ; 
    Post.findById(postId,
        (err,post)=>{
            if (err){ return res.status(401).json({'error':err})}
            var disliked = post.dislikes.includes(userId)
            return res.json({'disliked':disliked})
        })
}