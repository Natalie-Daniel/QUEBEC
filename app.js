

const express = require('express')
const app = express()
const port = process.env.port || 3000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://nbrown7:UNAlions1122@cluster0.x48nd31.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

console.log("before connection;")

client.connect(err => {
  console.log("in connect method");
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


app.get('/', (req, res) => {
  res.send('Hello World! Frosty Here!')
})

console.log('in the node console');

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})