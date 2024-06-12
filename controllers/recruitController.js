const Recruit = require('../models/recruitModel');
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




// 1. Create recruit
const addrecruit = async (req, res) => {
    try {



        const info = {
            consultancyLogo: req.files.consultancyLogo === undefined ?'':mainUrl + req.files.consultancyLogo[0].filename,
            gstImage: req.files.gstImage === undefined ?'':mainUrl + req.files.gstImage[0].filename,
            cardImage: req.files.cardImage === undefined ?'':mainUrl + req.files.cardImage[0].filename,
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            city: req.body.city,
            locality: req.body.locality,
            companyType: req.body.companyType,
            consultancyName: req.body.consultancyName,
            consultancyEmail: req.body.consultancyEmail,
            consultancyUrl: req.body.consultancyUrl,
            consultancyAbout: req.body.consultancyAbout,
            consultancySize: req.body.consultancySize,
            workingAs: req.body.workingAs,
        };



        const checkemail = await Recruit.findOne({ email: info.email });
        const checkphone = await Recruit.findOne({ phone: info.phone });

        if(checkemail){
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if(info.phone && checkphone){
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else{
            const recruit = await Recruit.create(info);

            

            const mailOptions = {
                from: 'HireOn <cpearnings@gmail.com>', // sender address
                to: info.email, // comma-separated list of recipients
                subject: 'Request for Approval of Company Profile',
                html: `<div style="background-color:blue;padding:30px;display:flex;justify-content:center;align-items:center;">
                <div style="background-color:white;border-radius:10px;padding:30px;width:100%">
                    <h3>Hire On</h3>
                    <div style="width: 100%;text-align:center">
    <img src="https://cdn-icons-png.flaticon.com/512/10646/10646637.png" width="60px" height="60px" style="object-fit: contain;">
</div>

                    <p style="text-align:start;">Dear ${info?.fullName},</p>
                    <p style="text-align:start;">I hope this message finds you well.</p>
                    <p style="text-align:start;">I am writing to request your urgent approval for the updated company profile, which we aim to finalize within the next two hours. Below are the key details of the profile for your quick review.</p>

                    <h4>Company Profile Details:</h4>

                    <p><b>Company Name: </b> ${info?.consultancyName}</p>
                    <p><b>Location: </b> ${info?.locality}</p>
                    <p><b>Location: </b> ${info?.locality}</p>
                    <p><b>Industry: </b> ${info?.companyType}</p>

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
                return res.status(200).json({ status: 'ok', data: recruit });
                // res.status(200).json({ status: 'ok', message: 'Email sent successfully.' });
            });



            
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all recruits
const getrecruits = async (req, res) => {
    try {
        const recruits = await Recruit.find({});
        return res.status(200).json({ status: 'ok', data: recruits });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};









// 3. Get recruit by id
const getrecruitById = async (req, res) => {
    try {
        const id = req.params.id;
        const recruit = await Recruit.findById(id);
        return res.status(200).json({ status: 'ok', data: recruit });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 4. Get seller by ID
const getrecruitByphone = async (req, res) => {
    try {
        const checkPhone = await Recruit.findOne({ phone: req.params.phone });
        if (checkPhone) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this phone', data: checkPhone });
        } else {
            return res.status(200).json({ status: 'ok', data: checkPhone });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};







// 4. Update recruit
const updaterecruit = async (req, res) => { 
    try {
        let id = req.params.id;
        let getImage = await Recruit.findById(id);
        const consultancyLogo = req.files?.consultancyLogo === undefined ? getImage?.consultancyLogo : mainUrl + req.files?.consultancyLogo[0].filename;
        const gstImage = req.files?.gstImage === undefined ? getImage?.gstImage : mainUrl + req.files?.gstImage[0].filename;
        const cardImage = req.files?.cardImage === undefined ? getImage?.cardImage : mainUrl + req.files?.cardImage[0].filename;


        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{
            const updatedrecruit = await Recruit.findByIdAndUpdate(id, 
                { ...req.body, consultancyLogo: consultancyLogo, gstImage:gstImage, cardImage:cardImage }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedrecruit });
        }


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// 4. Update recruit
const approverecruit = async (req, res) => { 
    try {
        let id = req.params.id;
        let getRecruit = await Recruit.findById(id);


        
        

            const updatedrecruit = await Recruit.findByIdAndUpdate(id, 
                { ...req.body }, 
                { new: true });



                
            const mailOptions = {
                from: 'HireOn <cpearnings@gmail.com>', // sender address
                to: getRecruit.email, // comma-separated list of recipients
                subject: 'Company Profile Successfully Approved',
                html: `<div style="background-color:blue;padding:30px;display:flex;justify-content:center;align-items:center;">
                <div style="background-color:white;border-radius:10px;padding:30px;width:100%">
                    <h3>Hire On</h3>
                    <div style="width: 100%;text-align:center">
    <img src="https://cdn-icons-png.flaticon.com/512/10646/10646637.png" width="60px" height="60px" style="object-fit: contain;">
</div>

                    <p style="text-align:start;">Dear ${getRecruit?.fullName},</p>
                    <p style="text-align:start;">I hope this message finds you well.</p>
                    <p style="text-align:start;">I am pleased to inform you that the company profile has been successfully approved. Thank you for your timely review and feedback.</p>

                    <h4>Company Profile Details:</h4>

                    <p><b>Company Name: </b> ${getRecruit?.consultancyName}</p>
                    <p><b>Location: </b> ${getRecruit?.locality}</p>
                    <p><b>Location: </b> ${getRecruit?.locality}</p>
                    <p><b>Industry: </b> ${getRecruit?.companyType}</p>

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
                return res.status(200).json({ status: 'ok', data: updatedrecruit });
                // res.status(200).json({ status: 'ok', message: 'Email sent successfully.' });
            });




            
        


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete recruit
const deleterecruit = async (req, res) => {
    try {
        const id = req.params.id;
        await Recruit.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Recruit deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    addrecruit,
    getrecruits,
    getrecruitById,
    updaterecruit,
    deleterecruit,
    getrecruitByphone,
    approverecruit
};
