const express = require('express')
const router = express.Router()  

const {createcourse , getAllcourse ,getcoursedetail } = require('../controllers/course')
const {createsection ,updatesection,deletesection} = require('../controllers/section') 
const { createsubsection ,deletesubsection ,updatesubsection} = require('../controllers/Subsection') 
const {isInstructor,auth,isstudent} = require('../middleware/auth')


//course 
router.post('/createcourse ' , auth , isInstructor , createcourse )
router.get('/getallcourse' , getAllcourse)
router.get('/getcoursedetail' , getcoursedetail) 

//section 
router.post('/createsection', auth ,isInstructor , createsection)
router.put('/updatesection' ,auth , isInstructor,updatesection )
router.delete('/deletesection' , auth,isInstructor,deletesection)

//subsection 
router.post('/createsubsection', auth ,isInstructor,createsubsection)
router.put('/updatesection' , auth,isInstructor,updatesubsection)
router.put('/deletesubsection' ,auth ,isInstructor ,deletesubsection) 

module.exports = router
