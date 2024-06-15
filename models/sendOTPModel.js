const mongoose = require('mongoose');

const sendOTPSchema = new mongoose.Schema({
    email: {
        type: String,
        allowNull: true,
    },
    otp: {
        type: String,
        allowNull: true,
    },
    verify: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const SendOTP = mongoose.model('SendOTP', sendOTPSchema);

module.exports = SendOTP;
