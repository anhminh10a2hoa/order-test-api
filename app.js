var express = require('express')
var axios = require('axios');
var cors = require('cors');
var app = express();

app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/', async(req, res) => {
  res.status(200).send('Hello!')
})

app.get('/project',cors(), async(req, res) => {
  const data = await axios.get('http://www.cc.puv.fi/~asa/json/project.json')
  console.log(data.data)
  res.status(200).send(data.data)
})

app.listen(3000);