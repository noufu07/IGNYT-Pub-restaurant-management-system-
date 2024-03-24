const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  foodName: String,
  foodPrice: Number, // Change this to Number type
  name: String,
  phone: String,
  table: String, // Assuming table number can also be a string
  plates: Number,
  status: {
    type: Boolean,
    default: false // Set default status to false
}

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
