const express = require('express')
const router = express.Router() 

const signup = require('../controllers/signup')
const login = require('../controllers/login')
const sendotp = require('../controllers/sendotp')

//authetication route
router.post('/signup' , signup) 
router.post('/login' ,login)
router.post('/sendotp' , sendotp) 


//reset password route 

module.exports = router