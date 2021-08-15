const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    file: {
        type: Buffer,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    }
})

const Uploads = mongoose.model("Uploads", uploadSchema)

module.exports = Uploads;