const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        allowNull: true,
    },
    email: {
        type: String,
        allowNull: true,
    },
    gender: {
        type: String,
        allowNull: true,
    },
    dob: {
        type: String,
        allowNull: true,
    },
    school: {
        type: String,
        allowNull: true,
    },
    degree: {
        type: String,
        allowNull: true,
    },
    grade: {
        type: String,
        allowNull: true,
    },
    fieldOfStudy: {
        type: String,
        allowNull: true,
    },
    startMonthDate: {
        type: String,
        allowNull: true,
    },
    startYearDate: {
        type: String,
        allowNull: true,
    },
    endMonthDate: {
        type: String,
        allowNull: true,
    },
    endYearDate: {
        type: String,
        allowNull: true,
    },
    experienceLevel: {
        type: String,
        allowNull: true,
    },
    skills: {
        type: Array,
        allowNull: true,
    },
    experience: {
        type: String,
        allowNull: true,
    },
    jobDetail: {
        type: Array,
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
    password: {
        type: String,
        allowNull: true,
    },
    locality: {
        type: String,
        allowNull: true,
    },
    jobTitle: {
        type: String,
        allowNull: true,
    },
    jobPreference: {
        type: String,
        allowNull: true,
    },
    cvImage: {
        type: String,
        allowNull: true,
    },
    profileImage: {
        type: String,
        allowNull: true,
    },
    age: {
        type: String,
        allowNull: true,
    },
    language: {
        type: Array,
        allowNull: true,
    },
    block: {
        type: String,
        default:'pending',
        allowNull: true,
    },
},{timestamps:true});


const User = mongoose.model('User', userSchema);

module.exports = User;
