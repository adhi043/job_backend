const { checkToken } = require('../auth/token_validation')
const managerController=require('../controllers/managerController')
const { upload } = require('../upload/UploadFile')

const router=require('express').Router()

router.get('/get',managerController.getmanagers)
router.post('/create',managerController.addmanager)

router.get('/get/:id',managerController.getmanagerById)
router.put('/update/:id',managerController.updatemanager)
router.delete('/delete/:id',managerController.deletemanager)


module.exports=router

