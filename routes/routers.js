
const router = require('express').Router();
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router.get('/', function(req, res, next) {
    res.render('home');
  });
// sign-up Post (Create an account)
router.post('/api/user' ,userController.signup_post);

// login Post 
router.post('/api/login' , authController.login_post);

//test
router.get('/error',(req,res)=>{
  res.render('error')
})





  module.exports =  router;
