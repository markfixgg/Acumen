const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    media: {
        type: Buffer,
        required: true
    },
    timestamp: Date
})

const Uploads = mongoose.model("Uploads", uploadSchema)

module.exports = Uploads;