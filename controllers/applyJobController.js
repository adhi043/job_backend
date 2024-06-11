
const { mainUrl } = require('../config/dbConfig');
const ApplyJob = require('../models/applyJobModel');


// 1. Create applyJob
const addapplyJob = async (req, res) => {
    try {



        const info = {
            postJobId: req.body.postJobId,
            userId: req.body.userId,
            remark: req.body.remark,
            block: req.body.block,
        };

            
            
            const applyJob = await ApplyJob.create(info);
            return res.status(200).json({ status: 'ok', data: applyJob });
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all applyJobs
const getapplyJobs = async (req, res) => {
    try {
        const applyJobs = await ApplyJob.find({});
        return res.status(200).json({ status: 'ok', data: applyJobs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 3. Get applyJob by id
const getapplyJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const applyJob = await ApplyJob.findById(id);
        return res.status(200).json({ status: 'ok', data: applyJob });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 4. Update applyJob
const updateapplyJob = async (req, res) => { 
    try {
        let id = req.params.id;


            const updatedapplyJob = await ApplyJob.findByIdAndUpdate(id, 
                { ...req.body }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedapplyJob });



        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete applyJob
const deleteapplyJob = async (req, res) => {
    try {
        const id = req.params.id;
        await ApplyJob.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'applyJob deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    addapplyJob,
    getapplyJobs,
    getapplyJobById,
    updateapplyJob,
    deleteapplyJob,
};
