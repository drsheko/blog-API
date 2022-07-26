const mongoose =require('mongoose');
const Post = require('../models/postModel')
const flash = require('connect-flash')
const passport =require('passport');
exports.home_get = async(req,res)=>{
    const posts = await Post.find().sort([['timestamp','descending']]).populate(['user','comment'])
    const flashMsg = req.flash().success;
    const data = {
        posts,flashMsg
    }
    res.json(data)
}


exports.login_post = 
passport.authenticate('local'), (req, res) => { }
exports.log_out =  (req, res) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      var msg = 'Log out successfully'
      res.json(msg);
    });
  }       