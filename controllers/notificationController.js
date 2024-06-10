const Notification = require('../models/notificationModel');

// 1. Create notification
const addnotification = async (req, res) => {
    try {
        const info = {
            employeId: req.body.employeId,
            taskId: req.body.taskId,
            title: req.body.title,
            msg: req.body.msg,
            seen: req.body.seen,
        };

        const notification = await Notification.create(info);
        return res.status(200).json({ status: 'ok', data: notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 2. Get all notifications
const getnotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({employeId:req.params.employeId});
        const notificsfi = await Notification.find({employeId:req.params.employeId,seen:false});

        notificsfi.map(async(i)=>{
            const seen=true;
            const updatednotification = await Notification.findByIdAndUpdate(i?._id, 
                { ...req.body, seen:seen }, 
                { new: true });
        })
        

        return res.status(200).json({ status: 'ok', data: notifications });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get notification by id
const getnotificationById = async (req, res) => {
    try {
        const id = req.params.id;
        const notification = await Notification.findById(id);
        return res.status(200).json({ status: 'ok', data: notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 3. Get notification by id
const getnotificationByStatus = async (req, res) => {
    try {
        const notification = await Notification.find({employeId:req.params.employeId,seen:false});
        return res.status(200).json({ status: 'ok', data: notification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Update notification
const updatenotification = async (req, res) => {
    try {
        let id = req.params.id;


        const updatednotification = await Notification.findByIdAndUpdate(id, 
            { ...req.body,  }, 
            { new: true });
        return res.status(200).json({ status: 'ok', data: updatednotification });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 5. Delete notification
const deletenotification = async (req, res) => {
    try {
        const id = req.params.id;
        await Notification.findByIdAndDelete(id);
        return res.status(200).json({ status: 'ok', message: 'Notification deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    addnotification,
    getnotifications,
    getnotificationById,
    updatenotification,
    deletenotification,
    getnotificationByStatus
};
