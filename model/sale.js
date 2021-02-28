const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Creating a Sale Schema
const SaleSchema = new Schema({
  employeeId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user'
  },
  dateOfSale: {
    type: Date,
    required: true
  },
  products: [{
    productName: String,
    _id: mongoose.Types.ObjectId,
    price: Number,
    discount: Number,
    count: Number
  }],
  totalDiscount: {
    type: Number,
    default: 0
  },
  vat: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    default: 0
  }
}, { versionKey: false, timestamps: true });

//Creating a Sale Model
const SaleModel = mongoose.model('sale', SaleSchema);

module.exports = SaleModel;