
const { mainUrl } = require('../config/dbConfig');
const Manager = require('../models/managerModel');


// 1. Create manager
const addmanager = async (req, res) => {
    try {



        const info = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            country: req.body.country,
            city: req.body.city,
        };


        

        const checkemail = await Manager.findOne({ email: info.email });
        const checkphone = await Manager.findOne({ phone: info.phone });

        if(checkemail){
            return res.status(200).json({ status: 'fail', message: 'Email already exist!' });
        }
        else if(info.phone && checkphone){
            return res.status(200).json({ status: 'fail', message: 'Phone number already exist!' });
        }
        else{
            
            
            const manager = await Manager.create(info);
            return res.status(200).json({ status: 'ok', data: manager });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all managers
const getmanagers = async (req, res) => {
    try {
        const managers = await Manager.find({});
        return res.status(200).json({ status: 'ok', data: managers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 3. Get manager by id
const getmanagerById = async (req, res) => {
    try {
        const id = req.params.id;
        const manager = await Manager.findById(id);
        return res.status(200).json({ status: 'ok', data: manager });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 4. Update manager
const updatemanager = async (req, res) => { 
    try {
        let id = req.params.id;

        let getImage = await Manager.findById(id);

        if(getImage?.phone===req.body.phone && req.body.phone){
            return res.status(200).json({ status: 'fail', message: 'This number is already in someone usage!' });
        }
        else if(getImage?.email===req.body.email && req.body.email){
            return res.status(200).json({ status: 'fail', message: 'This email is already in someone usage!' });
        }
        else{
            const updatedmanager = await Manager.findByIdAndUpdate(id, 
                { ...req.body }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedmanager });
        }


        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete manager
const deletemanager = async (req, res) => {
    try {
        const id = req.params.id;
        await Manager.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'manager deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    addmanager,
    getmanagers,
    getmanagerById,
    updatemanager,
    deletemanager,
};
