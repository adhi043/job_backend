const mongoose = require('mongoose');

const applyJobSchema = new mongoose.Schema({
    postJobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'PostJob',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    remark: {
        type: String,
        allowNull: true,
    },
    block: {
        type: String,
        allowNull: true,
    },
    
    
},{timestamps:true});


const ApplyJob = mongoose.model('ApplyJob', applyJobSchema);

module.exports = ApplyJob;
