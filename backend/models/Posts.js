const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Uploads'
    },
    activity: {
        type: Object,
        default: {
            likes: {
                type: Number,
                default: 0
            },
            reposts: {
                type: Number,
                default: 0
            },
            commentaries: {
                type: [mongoose.Schema.Types.ObjectId],
                ref: 'Commentaries',
                default: []
            }
        },
        required: false
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    createdAt: {
        type: Date,
        required: true
    }
})

const Posts = mongoose.model('Posts', postSchema)

module.exports = Posts