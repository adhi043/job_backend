const User = require('../models/userModel');
const { mainUrl } = require('../config/dbConfig');
const nodemailer = require('nodemailer');






const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // e.g., 'gmail', 'outlook'
    port:465,
    auth: {
        user: 'cpearnings@gmail.com', // your email address
        pass: 'txdvqubmdpostjrb' // your email password
    }
});



// 1. Create user
const adduser = async (req, res) => {
    try {



        const info = {
            cvImage: req.files.cvImage === undefined ?'':mainUrl + req.files.cvImage[0].filename,
            profileImage: req.files.profileImage === undefined ?'':mainUrl + req.files.profileImage[0].filename,
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            city: req.body.city,
            locality: req.body.locality,
            gender: req.body.gender,
            dob: req.body.dob,
            school: req.body.school,
            degree: req.body.degree,
            grade: req.body.grade,
            fieldOfStudy: req.body.fieldOfStudy,
            startMonthDate: req.body.startMonthDate,
            startYearDate: req.body.startYearDate,
            endMonthDate: req.body.endMonthDate,
            endYearDate: req.body.endYearDate,
            experienceLevel: req.body.experienceLevel,
            skills: req.body.skills,
            experience: req.body.experience,
            jobDetail: req.body.jobDetail,
            jobTitle: req.body.jobTitle,
            jobPreference: req.body.jobPreference,
            age: req.body.age,
            language: req.body.language,
        };



        const checkemail = await User.findOne({ email: info.email });
        const checkphone = await User.findOne({ phone: info.phone });

        if(checkemail){
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if(info.phone && checkphone){
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else{
            const user = await User.create(info);



            const mailOptions = {
                from: 'HireOn <cpearnings@gmail.com>', // sender address
                to: info.email, // comma-separated list of recipients
                subject: 'Request for Approval of User Profile',
                html: `<div style="background-color:blue;padding:30px;display:flex;justify-content:center;align-items:center;">
                <div style="background-color:white;border-radius:10px;padding:30px;width:100%">
                    <h3>Hire On</h3>
                    <div style="width: 100%;text-align:center">
    <img src="https://cdn-icons-png.flaticon.com/512/10646/10646637.png" width="60px" height="60px" style="object-fit: contain;">
</div>

                    <p style="text-align:start;">Dear ${info?.fullName},</p>
                    <p style="text-align:start;">I hope this message finds you well.</p>
                    <p style="text-align:start;">I am writing to request your urgent approval for the updated user profile, which we aim to finalize within the next two hours. Below are the key details of the profile for your quick review.</p>

                    <h4>User Profile Details:</h4>

                    <p><b>Full Name: </b> ${info?.email}</p>
                    <p><b>Phone: </b> ${info?.phone}</p>
                    <p><b>Location: </b> ${info?.locality}</p>

                    <p style="line-height:1.6;margin-bottom:20px;text-align:start;">Best regards,</p>
                    <p>Team Hireon</p>
                    <a href='mailto:info@hireon.co.in'>Info@hireon.co.in</a>
                    <p>7290034555</p>
                </div>
            </div>
            `,

            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ status: 'fail', message: 'Failed to send email.' });
                }
                console.log('Email sent:', info.response);
                return res.status(200).json({ status: 'ok', data: user });
                // res.status(200).json({ status: 'ok', message: 'Email sent successfully.' });
            });


        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all users
const getusers = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ status: 'ok', data: users });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};









// 3. Get user by id
const getuserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        return res.status(200).json({ status: 'ok', data: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 4. Get seller by ID
const getuserByphone = async (req, res) => {
    try {
        const checkPhone = await User.findOne({ phone: req.params.phone });
        if (checkPhone) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this phone', data: checkPhone });
        } else {
            return res.status(200).json({ status: 'ok', data: checkPhone });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




// 4. Update user
const updateuser = async (req, res) => { 
    try {
        let id = req.params.id;
        let getImage = await User.findById(id);
        const cvImage = req.files?.cvImage === undefined ? getImage?.cvImage : mainUrl + req.files?.cvImage[0].filename;
        const profileImage = req.files?.profileImage === undefined ? getImage?.profileImage : mainUrl + req.files?.profileImage[0].filename;


        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{
            const updateduser = await User.findByIdAndUpdate(id, 
                { ...req.body, cvImage: cvImage, profileImage:profileImage }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updateduser });
        }


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};









// 4. Update user
const approveuser = async (req, res) => { 
    try {
        let id = req.params.id;
        let getuser = await User.findById(id);


        
        

            const updateduser = await User.findByIdAndUpdate(id, 
                { ...req.body }, 
                { new: true });



                
            const mailOptions = {
                from: 'HireOn <cpearnings@gmail.com>', // sender address
                to: getuser.email, // comma-separated list of recipients
                subject: 'User Profile Successfully Approved',
                html: `<div style="background-color:blue;padding:30px;display:flex;justify-content:center;align-items:center;">
                <div style="background-color:white;border-radius:10px;padding:30px;width:100%">
                    <h3>Hire On</h3>
                    <div style="width: 100%;text-align:center">
    <img src="https://cdn-icons-png.flaticon.com/512/10646/10646637.png" width="60px" height="60px" style="object-fit: contain;">
</div>

                    <p style="text-align:start;">Dear ${getuser?.fullName},</p>
                    <p style="text-align:start;">I hope this message finds you well.</p>
                    <p style="text-align:start;">I am pleased to inform you that the user profile has been successfully approved. Thank you for your timely review and feedback.</p>

                    <h4>Company Profile Details:</h4>

                    <p><b>Full Name: </b> ${getuser?.fullName}</p>
                    <p><b>Phone: </b> ${getuser?.phone}</p>
                    <p><b>Location: </b> ${getuser?.locality}</p>

                    <p style="line-height:1.6;margin-bottom:20px;text-align:start;">Best regards,</p>
                    <p>Team Hireon</p>
                    <a href='mailto:info@hireon.co.in'>Info@hireon.co.in</a>
                    <p>7290034555</p>
                </div>
            </div>
            `,

            };

            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error occurred:', error);
                    return res.status(500).json({ status: 'fail', message: 'Failed to send email.' });
                }
                console.log('Email sent:', info.response);
                return res.status(200).json({ status: 'ok', data: updateduser });
                // res.status(200).json({ status: 'ok', message: 'Email sent successfully.' });
            });




            
        


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 5. Delete user
const deleteuser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'user deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    adduser,
    getusers,
    getuserById,
    updateuser,
    deleteuser,
    getuserByphone,
    approveuser
};
