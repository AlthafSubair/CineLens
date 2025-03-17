import express from 'express'
import { forgotPassword,  logIn, registerUser, resendOtp, resetPassword, verifyOtp } from '../controllers/authController.js'


const router = express.Router()

router.get('/test', (req,res)=>{
    res.send('test passed')
})



router.post('/register', registerUser)

router.post('/verify-otp', verifyOtp)

router.post('/send-otp',resendOtp)

router.post('/login', logIn)

router.post('/reset-password', resetPassword)

router.post('/forgot-password', forgotPassword)

export default router