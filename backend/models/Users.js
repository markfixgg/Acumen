const mongoose = require('mongoose')

const bioSchema = mongoose.Schema({
    age: {
        type: Number,
        default: null
    },
    location: {
        type: String,
        default: null
    },
    occupation: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        default: null
    }
})

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    bio: {
        type: bioSchema,
        default: {
            age: null,
            gender: null,
            location: null,
            occupation: null
        }
    },
    uid: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        default: null
    }
})

const Users = mongoose.model('Users', userSchema);

module.exports = Users