const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating a Product Schema
const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true
  },
  available: {
    type: Number,
    required: true,
    default: 0
  },
  vat: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0
  },
  image: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { versionKey: false, timestamps: true });

//Creating a Product Model
const ProductModel = mongoose.model('product', ProductSchema);

module.exports = ProductModel;