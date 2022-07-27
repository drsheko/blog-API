
const router = require('express').Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')


router.get('/', function(req, res, next) {
    res.render('home');
  });
// sign-up  (Create an account)
router.post('/api/sign-up' ,userController.signup_post);

// login  
router.post('/api/login' , authController.login_post);

// logout 
router.get('/api/logout',authController.log_out)

// create Posts 
router.post('/api/post',postController.createPost_post)
// delete Post 
router.delete('/api/remove-post/:id' , postController.deletePost)

// Get all Posts 
router.get('/api/posts' , postController.get_all_posts)

//get Post to update
router.get('/api/posts/edit-post/:id',postController.Post_edit_get)
// Update Post -put
router.put('/api/posts/post/:id' , postController.Post_edit_post)

//get Posts for certain user
router.get('/api/user/posts' , postController.get_user_posts)
  module.exports =  router;
