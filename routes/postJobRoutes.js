const { checkToken } = require('../auth/token_validation')
const postJobController=require('../controllers/postJobController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',postJobController.getpostJobs)
router.post('/create',postJobController.addpostJob)

router.get('/get/:id',postJobController.getpostJobById)
router.put('/update/:id',postJobController.updatepostJob)
router.delete('/delete/:id',postJobController.deletepostJob)


module.exports=router

