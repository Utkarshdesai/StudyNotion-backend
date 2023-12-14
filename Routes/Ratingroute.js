const express = require('express')
const router = express.Router()   

//rating and review route
const {createRating ,getallrating ,Avgrating} = require('../controllers/Ratingandreviewcontroller')
const {auth, isInstructor ,isstudent} = require('../middleware/auth') 


router.post('/createrating' , auth ,isInstructor )
router.get('/getavgrating' , Avgrating)
router.get('/getallreview' , getallrating) 

module.exports = router