import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,

    },
    email: {
        type: String,

    },
    password: {
        type: String,

    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

})

const User = mongoose.model('User', userSchema);

export {
    User
}