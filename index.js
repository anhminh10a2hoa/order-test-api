var express = require('express')
var axios = require('axios');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var Order = require('./models/order');
require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var router = express.Router();

let port = process.env.PORT || 3000

var mongoose   = require('mongoose');
const DB = process.env.DB_URL.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);
mongoose.connect(DB); // connect to our database

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

router.get('/', function(req, res) {
  res.json({ message: 'Check it out: https://github.com/anhminh10a2hoa/test-vamk-api' });
});

router.route('/orders')
  .post(function(req, res) {
    var order = new Order();      // create a new instance of the Bear model
    order.orderid = req.body.orderid;
    order.customerid = req.body.customerid;
    order.customer = req.body.customer;
    order.invaddr = req.body.invaddr;
    order.delivaddr = req.body.delivaddr;
    order.deliverydate = req.body.deliverydate;
    order.respsalesperson = req.body.respsalesperson;
    order.comment = req.body.comment;
    order.total = req.body.total;
    order.status = req.body.status;
    order.products = req.body.products;

    order.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Order created!' });
    });
  })
  .get(function(req, res) {
    Order.find(function(err, orders) {
      if (err)
        res.send(err);
      res.json(orders);
    });
});

router.route('/orders/:orderId')
  .get(function(req, res) {
      Order.findById(req.params.orderId, function(err, order) {
          if (err)
            res.send(err);
          res.json(order);
      });
  })
  .put(function(req, res) {
    Order.findById(req.params.orderId, function(err, order) {
      if (err)
        res.send(err);

      order.orderid = req.body.orderid;
      order.customerid = req.body.customerid;
      order.customer = req.body.customer;
      order.invaddr = req.body.invaddr;
      order.delivaddr = req.body.delivaddr;
      order.deliverydate = req.body.deliverydate;
      order.respsalesperson = req.body.respsalesperson;
      order.comment = req.body.comment;
      order.total = req.body.total;
      order.status = req.body.status;
      order.products = req.body.products;
      // save the bear
      order.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: `Order ${req.params.orderId} was updated!` });
      })
    })
  })
  .delete(function(req, res) {
      Order.remove({
          _id: req.params.orderId
      }, function(err, order) {
          if (err)
            res.send(err);

          res.json({ message: 'Successfully deleted' });
      });
  });

app.get('/orders', cors(), async(req, res) => {
  const data = await axios.get('http://www.cc.puv.fi/~asa/json/project.json')
  console.log(data.data)
  res.status(200).send(data.data)
})

app.use('/api/v1', router);

app.listen(port, () => {
  console.log('server is running on port: ' + port)
});