
const router = require('express').Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')
const postController = require('../controllers/postController')


router.get('/', function(req, res, next) {
    res.render('home');
  });
// sign-up  (Create an account)
router.post('/api/user' ,userController.signup_post);

// login  
router.post('/api/login' , authController.login_post);

// logout 
router.get('/api/logout',authController.log_out)

// create Posts 
router.post('/api/post',postController.createPost_post)



  module.exports =  router;
