const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    image: { type: String },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: { type: ObjectId, ref: 'user', required: true }



},{ timestamps: true })
const productModel = mongoose.model('product', productSchema);
module.exports = productModel;