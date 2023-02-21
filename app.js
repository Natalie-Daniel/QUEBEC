require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port || 3000;
const bodyParser = require('body-parser')
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI , { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("chillAppz").collection("food");
    //const collection = client.db("papa").collection("dev-profiles");
    const result = await collection.find().toArray();
    //const result = await collection.findOne();
    console.log("cxnDB result: ", result);
      return result; 
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}

app.post('ejs', (req, res) => {
  //res.send('Hello World! Frosty Here! <br/> <a href="mongo">mongo</a>')
  res.render('index');
  
  
})

app.get('/mongo', async (req, res) => {

  //res.send("check node console")

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[1].Name);

  res.send(`here ya go, Frosty. ${ result[1].Name }` ); 
});

app.get('/update', (req, res) => {

//get data from form

console.log("in get to slash name:", req.query.ejsFormName); 
myName = req.query.ejsFormName; 

//update in the databse

})

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})