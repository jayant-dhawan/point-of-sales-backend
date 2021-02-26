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
    ProductId: mongoose.Types.ObjectId,
    price: Number,
    discount: Number
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
});

//Creating a Sale Model
const SaleModel = mongoose.model('sale', SaleSchema);

module.exports = SaleModel;