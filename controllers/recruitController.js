const Recruit = require('../models/recruitModel');
const { mainUrl } = require('../config/dbConfig');


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
            block: true,
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
            return res.status(200).json({ status: 'ok', data: recruit });
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
        const consultancyLogo = req.files.consultancyLogo === undefined ? getImage.consultancyLogo : mainUrl + req.files.consultancyLogo[0].filename;
        const gstImage = req.files.gstImage === undefined ? getImage.gstImage : mainUrl + req.files.gstImage[0].filename;
        const cardImage = req.files.cardImage === undefined ? getImage.cardImage : mainUrl + req.files.cardImage[0].filename;


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
    getrecruitByphone
};
