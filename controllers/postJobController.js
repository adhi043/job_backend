
const { mainUrl } = require('../config/dbConfig');
const PostJob = require('../models/postJobModel');


// 1. Create postJob
const addpostJob = async (req, res) => {
    try {



        const info = {
            recruitId: req.body.recruitId,
            opening: req.body.opening,
            jobType: req.body.jobType,
            gender: req.body.gender,
            qualification: req.body.qualification,
            jobBenefit: req.body.jobBenefit,
            language: req.body.language,
            workingDays: req.body.workingDays,
            jobShift: req.body.jobShift,
            jobCategory: req.body.jobCategory,
            jobTitle: req.body.jobTitle,
            jobIndustries: req.body.jobIndustries,
            jobDescription: req.body.jobDescription,
        };

            
            
            const postJob = await PostJob.create(info);
            return res.status(200).json({ status: 'ok', data: postJob });
        

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all postJobs
const getpostJobs = async (req, res) => {
    try {
        const postJobs = await PostJob.find({});
        return res.status(200).json({ status: 'ok', data: postJobs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// 3. Get postJob by id
const getpostJobById = async (req, res) => {
    try {
        const id = req.params.id;
        const postJob = await PostJob.findById(id);
        return res.status(200).json({ status: 'ok', data: postJob });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};






// 4. Update postJob
const updatepostJob = async (req, res) => { 
    try {
        let id = req.params.id;


            const updatedpostJob = await PostJob.findByIdAndUpdate(id, 
                { ...req.body }, 
                { new: true });
            return res.status(200).json({ status: 'ok', data: updatedpostJob });



        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete postJob
const deletepostJob = async (req, res) => {
    try {
        const id = req.params.id;
        await PostJob.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'postJob deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};





module.exports = {
    addpostJob,
    getpostJobs,
    getpostJobById,
    updatepostJob,
    deletepostJob,
};
