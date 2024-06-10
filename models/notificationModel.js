const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    employeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Employe',
    },
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Task',
    },
    title: {
        type: String,
        allowNull: true,
    },
    msg: {
        type: String,
        allowNull: true,
    },
    seen: {
        type: Boolean,
        allowNull: true,
    },
},{timestamps:true});


const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
