
const router = require('express').Router();
const userController = require('../controllers/userController')


router.get('/', function(req, res, next) {
    res.render('home');
  });
// sign-up Post (Create an account)
router.post('/api/user' ,userController.signup_post);









  module.exports =  router;
