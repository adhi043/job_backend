const { checkToken } = require('../auth/token_validation')
const userController=require('../controllers/userController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',userController.getusers)
router.post('/create',upload.fields([{name:'cvImage',maxCount:1},{name:'profileImage',maxCount:1}]),userController.adduser)

router.get('/get/:id',userController.getuserById)
router.get('/getPhone/:phone',userController.getuserByphone)
router.put('/update/:id',upload.fields([{name:'cvImage',maxCount:1},{name:'profileImage',maxCount:1}]),userController.updateuser)
router.delete('/delete/:id',userController.deleteuser)


module.exports=router

