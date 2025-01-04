import mongoose from "mongoose";

const UserScheme = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    photo: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/148995092?v=4&size=64",
    },
    bio: {
        type: String,
        default: "I am a new user.",
    },
    role: {
        type: String,
        enum: ["user", "admin", "creator"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
})

const User = mongoose.model('User', UserScheme)

export default User