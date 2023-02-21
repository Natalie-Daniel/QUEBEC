require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port || 3000;
const bodyParser = require('body-parser')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nbrown7:UNAlions1122@cluster0.x48nd31.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/', (req, res) => {
  res.send('Hello World! Frosty Here! <br/> <a href="mongo">mongo</a>')
})

app.get('/mongo', async (req, res) => {

  //res.send("check node console")

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[1].Name);

  res.send(`here ya go, Frosty. ${ result[1].Name }` ); 
});

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})