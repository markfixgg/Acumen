const mongoose = require("mongoose");

const commentarySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    timestamp: {
        type: Date,
        required: true
    }
})

const Commentaries = mongoose.model('Commentaries', commentarySchema);

module.exports = Commentaries;