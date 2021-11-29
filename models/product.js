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

module.exports = mongoose.model('Product', ProductSchema);