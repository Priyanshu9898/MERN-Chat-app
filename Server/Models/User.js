import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
    name: {
        type: "String",
        required: [true, "Name is required"],
    },

    username: {
        type: "String",
        required: [true, "Username is required"],
    },
    email: {
        type: "String",
        required: [true, "Email is required"],
    },
    password: {
        type: "String",
        required: [true, "Password is required"],
    },

    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },

    avatarImage: {
        type: String,
        default: ""
    }
});


export const User = mongoose.model("User", UserModel);

