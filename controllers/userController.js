const User = require('../models/userModel');
const { mainUrl } = require('../config/dbConfig');


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
            return res.status(200).json({ status: 'ok', data: user });
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
        const cvImage = req.files.cvImage === undefined ? getImage.cvImage : mainUrl + req.files.cvImage[0].filename;
        const profileImage = req.files.profileImage === undefined ? getImage.profileImage : mainUrl + req.files.profileImage[0].filename;


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
    getuserByphone
};
