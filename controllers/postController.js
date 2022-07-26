const User = require('../models/userModel');
const Post =require('../models/postModel');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {body , validationResult} = require('express-validator');
const path = require('path');
const flash =require('connect-flash');


