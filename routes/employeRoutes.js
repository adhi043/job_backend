const { checkToken } = require('../auth/token_validation')
const employeController=require('../controllers/employeController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',employeController.getemployes)
router.post('/create',upload.fields([{name:'image',maxCount:1}]),employeController.addemploye)

router.get('/get/:id',employeController.getemployeById)
router.get('/getEmail/:email',employeController.getemployeByemail)
router.put('/update/:id',upload.fields([{name:'image',maxCount:1}]),employeController.updateemploye)
router.delete('/delete/:id',employeController.deleteemploye)


module.exports=router

