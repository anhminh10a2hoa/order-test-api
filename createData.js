var axios = require('axios');

async function getData(url) {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    console.log("error", error);
    return []
  }
}

async function addDataToMongo() {
  const data = await getData('https://node-api-deploy-vamkk.herokuapp.com/project')
  let i = 0;

  let addDataIntervalTime = setInterval(async function(){
    i++;
    if(i == data.length) clearInterval(addDataIntervalTime)
    else {
      let newData = data[i]
      newData.totalprice = data[i].totalprice * 1
      for(let j = 0; j < data[i].products.length; j++) {
        newData.products[j].qty = data[i].products[j].qty * 1
        newData.products[j].unit_price = data[i].products[j].unit_price * 1
      }
      const res = await axios.post('https://orders-testing-api.herokuapp.com/api/v1/orders', newData)
      console.log(res)
    }
  }, 2000) 
}

addDataToMongo()