var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema  = new Schema({
  code: {
    type: String,
    required: [true, 'Product code must not be empty.']
  },
  product: {
    type: String,
    required: [true, 'Product name must not be empty.']
  },
  description: {
    type: String,
    required: [false]
  },
  suppliercode: {
    type: String,
    required: [true, 'Supplier code must not be empty.']
  },
  qty: Number,
  unit_price: Number,
  shelf_pos: {
    type: String,
    required: [true, 'Shelf pos must not be empty.']
  },
});

var OrderSchema  = new Schema({
  orderid: {
    type: String,
    required: [true, 'Order id must not be empty.']
  },
  customerid: {
    type: String,
    required: [true, 'Customer id must not be empty.']
  },
  customer: {
    type: String,
    required: [true, 'Customer must not be empty.']
  },
  invaddr: {
    type: String,
    required: [true, 'Inva address must not be empty.']
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
    required: [true, 'Respsales person must not be empty.']
  },
  status: {
    type: Number,
    validate: {
      validator: function(val) {
        // this only points to current doc on NEW document creation
        return val < 4 && val >= 0 && Number.isInteger(val);
      },
      message: 'Status must be an integer between 0 and 3'
    },
    default: 0
  },
  comment: String,
  totalprice: Number,
  products: [ProductSchema],
});

module.exports = mongoose.model('Order', OrderSchema);