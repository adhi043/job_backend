const { checkToken } = require('../auth/token_validation')
const recruitController=require('../controllers/recruitController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',recruitController.getrecruits)
router.post('/create',upload.fields([{name:'consultancyLogo',maxCount:1},{name:'gstImage',maxCount:1},{name:'cardImage',maxCount:1}]),recruitController.addrecruit)

router.get('/get/:id',recruitController.getrecruitById)
router.get('/getPhone/:phone',recruitController.getrecruitByphone)
router.put('/update/:id',upload.fields([{name:'consultancyLogo',maxCount:1},{name:'gstImage',maxCount:1},{name:'cardImage',maxCount:1}]),recruitController.updaterecruit)
router.delete('/delete/:id',recruitController.deleterecruit)


module.exports=router

