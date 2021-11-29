var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema  = new Schema({
  code: {
    type: String,
    required: [false]
  },
  product: {
    type: String,
    required: [false]
  },
  description: {
    type: String,
    required: [false]
  },
  suppliercode: {
    type: String,
    required: [false]
  },
  qty: Number,
  unit_price: Number,
  shelf_pos: {
    type: String,
    required: [false]
  },
});

var OrderSchema  = new Schema({
  orderid: {
    type: String,
    required: [false]
  },
  customerid: {
    type: String,
    required: [false]
  },
  customer: {
    type: String,
    required: [false]
  },
  invaddr: {
    type: String,
    required: [false]
  },
  delivaddr: {
    type: String,
    required: [false]
  },
  deliverydate: {
    type: String,
    required: [false]
  },
  respsalesperson: {
    type: String,
    required: [false]
  },
  comment: String,
  totalprice: Number,
  products: [ProductSchema],
});

module.exports = mongoose.model('Order', OrderSchema);