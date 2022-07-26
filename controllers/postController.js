const User = require('../models/userModel');
const Post =require('../models/postModel');
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
                user:req.user._id,
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

exports.deletePost = async(req,res)=>{
    var id = req.params.id ; 
    Post.findByIdAndDelete(id , (err=>{
        if(err){return res.status(401).json({
            'errors':"Can't delete the post"
        })}
        else {return res.json({'success':'Post has been deleted'})}
    }))
}