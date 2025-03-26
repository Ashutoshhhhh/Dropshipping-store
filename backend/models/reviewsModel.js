const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const reviewSchema = new Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: ObjectId, ref: 'user', required: true },
    productId: { type: ObjectId, ref: 'product', required: true }
}, { timestamps: true })

const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;