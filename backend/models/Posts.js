const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    media: {
        type: Object,
        default: {
            photos: {
                type: Array,
                default: []
            },
            videos: {
                type: Array,
                default: []
            }
        },
        required: false
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
            comments: {
                type: Array,
                default: []
            }
        },
        required: false
    },
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Users'},
    dateCreated: {
        type: String,
        required: true
    }
})

const Posts = mongoose.model('Posts', postSchema)

module.exports = Posts