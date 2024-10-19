import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {typeof: 'string', required: true},
    email : {typeof: 'string', required: true, unique: true},
    password : {typeof: 'string', required: true},
    cartData : {typeof: Object, default : {}},
}, {minimize: false})

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;