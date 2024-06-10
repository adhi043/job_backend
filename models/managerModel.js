const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        allowNull: true,
    },
    lastName: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    password: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: true,
    },
    city: {
        type: String,
        allowNull: true,
    },
    country: {
        type: String,
        allowNull: true,
    },
    otp: {
        type: String,
        allowNull: true,
    },
},{timestamps:true});


const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
