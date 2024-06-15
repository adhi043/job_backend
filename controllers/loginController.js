
const { compareSync, hashSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { KEY_NAME } = require('../config/dbConfig');
const Employe = require('../models/employeModel');
const Manager = require('../models/managerModel');
const nodemailer = require('nodemailer');
const Recruit = require('../models/recruitModel');
const User = require('../models/userModel');
const SendOTP = require('../models/sendOTPModel');


const loginemploye = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            username: req.body.username,
            password: req.body.password,
        };

        const userData = await Employe.findOne({ username: info.username });

        console.log(userData);

        if (userData) {
            // const ispasswordMatch = await Employe.findOne({ password: info.password });
            if (info.password === userData?.password) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Username not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};







const loginmanager = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            email: req.body.email,
            password: req.body.password,
        };

        const userData = await Manager.findOne({ email: info.email });

        if (userData) {

            if (info.password === userData?.password) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};






const loginrecruit = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            email: req.body.email,
            password: req.body.password,
        };

        const userData = await Recruit.findOne({ email: info.email,block:false });

        if (userData) {

            if (info.password === userData?.password) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};





const loginuser = async (req, res) => {
    try {
        console.log(req.body);
        let info = {
            email: req.body.email,
            password: req.body.password,
        };

        const userData = await User.findOne({ email: info.email });

        if (userData) {

            if (info.password === userData?.password) {
                // Generate JWT token for authentication
                const token = sign({ id: userData._id, phone: userData.phone }, KEY_NAME, { expiresIn: '1h' });

                res.status(200).json({
                    status: 'ok',
                    message: "Successfully logged in",
                    token: token,
                    data: userData,
                });
            } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'Wrong Password',
                });
            }
        } else {
            res.status(200).json({
                status: 'fail',
                message: 'Email not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};








const transporter = nodemailer.createTransport({
    host: 'mail.proshelf.net', // e.g., 'gmail', 'outlook'
    port:465,
    auth: {
        user: 'otp@proshelf.net', // your email address
        pass: 'i-4)rkhHwz@X' // your email password
    }
});



const sendotpRecruit = async (req, res) => {

    try {

        

        const userData = await SendOTP.findOne({ email: req.body.email,verify:true });

        console.log(userData);



        if (userData) {
            return res.status(200).json({
                status: 'fail',
                message: 'Email already exist',
            });
        }
        else {

            var randomCode = (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();




            // Setup email data
            const mailOptions = {
                from: 'ProShelf <otp@proshelf.net>', // sender address
                to: req.params.email, // comma-separated list of recipients
                subject: 'ProShelf OTP',
                html: `<div style="background-color:blue;padding:30px;display:flex;justify-content:center;align-items:center;">
                <div style="background-color:white;border-radius:10px;padding:30px;width:100%">
                    <h3>Hire On</h3>
                    <div style="width: 100%;text-align:center">
    <img src="https://cdn-icons-png.flaticon.com/512/10646/10646637.png" width="60px" height="60px" style="object-fit: contain;">
</div>

                    <h3 style="text-align:center;">Here is your One Time Password</h3>
                    <p style="text-align:center;">to validate your email address</p>
                    <div style="margin:30px 0px;">
                        <h3 style="text-align:center;letter-spacing:18px;font-size:40px;">${randomCode}</h3>
                    </div>
                    <p style="line-height:1.6;margin-bottom:20px;text-align:center;">Thank you for your requesting.</p>
                </div>
            </div>
            `,

            };

            // Send email
            transporter.sendMail(mailOptions, async(error, info) => {
                if (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ status: 'fail', message: 'Failed to send email.' });
                }
                console.log('Email sent:', info.response);


                const createotp = await SendOTP.create({email:req.body.email,otp:randomCode,verify:false});

                res.status(200).json({ status: 'ok', message: 'OTP sent to mail successfully.' });
            });


        } 
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};



const updateemploye = async (req, res) => {

    try {

console.log(req.params.email);
        const userData = await Employe.findOne({ email: req.params.email });


        if (userData) {

            var randomCode = '';


            const updatedemploye = await Employe.findByIdAndUpdate(userData?._id,
                { ...req.body, otp: randomCode, },
                { new: true });

            res.status(200).json({ status: 'ok', message: 'Password updated successfully.' });

        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'Employe not found',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};



const verifyotprecruit = async (req, res) => {

    try {


        const userData = await SendOTP.findOne({ email: req.params.email, otp: req.params.otp });


        if (userData) {

            const updatedrecruit = await SendOTP.findByIdAndUpdate(userData?._id,
                { verify: true, },
                { new: true });

            res.status(200).json({ status: 'ok', message: 'OTP verified successfully.',updatedemploye: updatedrecruit });

        } else {
            return res.status(200).json({
                status: 'fail',
                message: 'Invalid OTP!',
            });
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};









module.exports = {
    loginemploye,
    loginmanager,
    loginrecruit,
    loginuser,
    sendotpRecruit,
    updateemploye,
    verifyotprecruit
};
