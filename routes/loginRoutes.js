const { checkToken } = require('../auth/token_validation')
const loginController=require('../controllers/loginController')

const router=require('express').Router()

router.post('/employe',loginController.loginemploye)
router.get('/otp/:email/:otp',loginController.verifyotprecruit)
router.post('/verify',loginController.sendotpRecruit)
router.post('/update/:email',loginController.updateemploye)
router.post('/manager',loginController.loginmanager)
router.post('/user',loginController.loginuser)
router.post('/recruit',loginController.loginrecruit)


module.exports=router

