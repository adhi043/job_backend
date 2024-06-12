const mongoose = require('mongoose');

const postJobSchema = new mongoose.Schema({
    recruitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Recruit',
    },
    opening: {
        type: String,
        allowNull: true,
    },
    jobType: {
        type: String,
        allowNull: true,
    },
    gender: {
        type: String,
        allowNull: true,
    },
    qualification: {
        type: String,
        allowNull: true,
    },
    jobBenefit: {
        type: String,
        allowNull: true,
    },
    language: {
        type: String,
        allowNull: true,
    },
    workingDays: {
        type: String,
        allowNull: true,
    },
    jobShift: {
        type: String,
        allowNull: true,
    },
    jobCategory: {
        type: String,
        allowNull: true,
    },
    jobTitle: {
        type: String,
        allowNull: true,
    },
    jobIndustries: {
        type: String,
        allowNull: true,
    },
    jobDescription: {
        type: String,
        allowNull: true,
    },
    block: {
        type: String,
        default:'pending',
        allowNull: true,
    },
    
},{timestamps:true});


const PostJob = mongoose.model('PostJob', postJobSchema);

module.exports = PostJob;
