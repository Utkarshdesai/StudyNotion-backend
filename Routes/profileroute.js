const express = require('express')
const router = express.Router()  

const {updateprofile , deleteprofile ,getAlluserdetail} = require('../controllers/profile')
const auth = require ('../middleware/auth')



router.put('/updateprofile' , auth ,updateprofile)
router.put('/updatedisplaypic' , auth ,)
router.delete('/deleteprofile' , auth, deleteprofile )
router.get('/getalldetails' , auth , getAlluserdetail ) 

module.exports = router 