const mongoose = require('mongoose');

const recruitSchema = new mongoose.Schema({
    fullName: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    companyType: {
        type: String,
        allowNull: true,
    },
    consultancyName: {
        type: String,
        allowNull: true,
    },
    consultancyEmail: {
        type: String,
        allowNull: true,
    },
    consultancyUrl: {
        type: String,
        allowNull: true,
    },
    consultancyAbout: {
        type: String,
        allowNull: true,
    },
    consultancySize: {
        type: String,
        allowNull: true,
    },
    consultancyLogo: {
        type: String,
        allowNull: true,
    },
    workingAs: {
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
    locality: {
        type: String,
        allowNull: true,
    },
    gstImage: {
        type: String,
        allowNull: true,
    },
    cardImage: {
        type: String,
        allowNull: true,
    },
},{timestamps:true});


const Recruit = mongoose.model('Recruit', recruitSchema);

module.exports = Recruit;
