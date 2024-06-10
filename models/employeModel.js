const mongoose = require('mongoose');

const employeSchema = new mongoose.Schema({
    username: {
        type: String,
        allowNull: true,
    },
    firstName: {
        type: String,
        allowNull: true,
    },
    lastName: {
        type: String,
        allowNull: true,
    },
    token: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    phone: {
        type: String,
        allowNull: true,
    },
    password: {
        type: String,
        allowNull: true,
    },
    image: {
        type: String,
        allowNull: true,
    },
    address: {
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
    block: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Employe = mongoose.model('Employe', employeSchema);

module.exports = Employe;
