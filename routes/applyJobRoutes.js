const { checkToken } = require('../auth/token_validation')
const applyJobController=require('../controllers/applyJobController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',applyJobController.getapplyJobs)
router.post('/create',applyJobController.addapplyJob)

router.get('/get/:id',applyJobController.getapplyJobById)
router.put('/update/:id',applyJobController.updateapplyJob)
router.delete('/delete/:id',applyJobController.deleteapplyJob)


module.exports=router

