const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    code: { type: Number, required: true },
    name: { type: String, required: true},
    price: { type: Number, required:true},
    stock: {type: Number, required: true}
});

module.exports = mongoose.model('Product', ProductSchema);
