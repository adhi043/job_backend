const Employe = require('../models/employeModel');
const { mainUrl } = require('../config/dbConfig');


// 1. Create employe
const addemploye = async (req, res) => {
    try {



        const info = {
            image: req.files.image === undefined ?'':mainUrl + req.files.image[0].filename,
            firstName: req.body.firstName,
            username: req.body.username,
            lastName: req.body.lastName,
            token: req.body.token,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
            block: req.body.block,
        };



        const checkemail = await Employe.findOne({ email: info.email });
        const checkphone = await Employe.findOne({ phone: info.phone });

        if(checkemail){
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if(info.phone && checkphone){
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else{
            const employe = await Employe.create(info);
            return res.status(200).json({ status: 'ok', data: employe });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all employes
const getemployes = async (req, res) => {
    try {
        const employes = await Employe.find({});
        return res.status(200).json({ status: 'ok', data: employes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};









// 3. Get employe by id
const getemployeById = async (req, res) => {
    try {
        const id = req.params.id;
        const employe = await Employe.findById(id);
        return res.status(200).json({ status: 'ok', data: employe });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





// 4. Get seller by ID
const getemployeByemail = async (req, res) => {
    try {
        const seller = await Employe.findOne({ email: req.params.email });
        if (seller) {
            return res.status(200).json({ status: 'fail', message: 'Already register on this email', data: seller });
        } else {
            return res.status(200).json({ status: 'ok', data: seller });

        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};




// 4. Update employe
const updateemploye = async (req, res) => { 
    try {
        let id = req.params.id;
        let getImage = await Employe.findById(id);
        const image = req.files.image === undefined ? getImage.image : mainUrl + req.files.image[0].filename;


        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{
            const updatedemploye = await Employe.findByIdAndUpdate(id, 
                { ...req.body, image: image, }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedemploye });
        }


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete employe
const deleteemploye = async (req, res) => {
    try {
        const id = req.params.id;
        await Employe.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'employe deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    addemploye,
    getemployes,
    getemployeById,
    updateemploye,
    deleteemploye,
    getemployeByemail
};
