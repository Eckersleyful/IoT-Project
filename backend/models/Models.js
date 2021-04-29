const mongoose = require('mongoose');

/**
 * Schema for single report that a device makes.
 */
const reportSchema = mongoose.Schema({
    isFull: {
        type: Boolean,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
});
module.exports.ReportModel = mongoose.model('Report', reportSchema);

/**
 * Schema for storing reporst made by a single device.
 */
const deviceSchema = mongoose.Schema({
    reports: [reportSchema]
});
module.exports.DeviceModel = mongoose.model('Device', deviceSchema);