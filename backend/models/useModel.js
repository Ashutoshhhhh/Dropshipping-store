const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    profileImage: { type: String },
    createdAt: { type: Date, default: Date.now }

},{timestamps:true})

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;