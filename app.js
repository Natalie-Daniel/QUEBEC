require("dotenv").config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')
const { ObjectId } = require('mongodb')
const PORT = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')


async function cxnDB(){

  try{
    client.connect; 
    const collection = client.db("chillAppz").collection("food");
    // const collection = client.db("papa").collection("dev-profiles");
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


// app.get('/', (req, res) => {
//   //res.send('Hello World! Frosty Here! <br/> <a href="mongo">mongo</a>');

//   res.render('index'); 

// })

app.get('/', async (req, res) => {

  let result = await cxnDB().catch(console.error); 

  // console.log("get/: ", result);

  res.render('index', {  foodData : result })
})

app.get('/mongo', async (req, res) => {

  // res.send("check your node console, bro");

  let result = await cxnDB().catch(console.error); 

  console.log('in get to slash mongo', result[1].drink_name); 

  res.send(`here ya go, Frosty. ${ result[1].drink_name }` ); 

})

// app.get('/create', async (req, res) => {

//   //get data from the form 

//   console.log("in get to slash update:", req.query.ejsFormName); 
//   myName = req.query.ejsFormName; 

//   //update in the database. 
//   client.connect; 
//   const collection = client.db("chillAppz").collection("food");
//   await collection.insertOne({ 
//     Name: "Sushi"
// })

// })

app.post('/addFood', async (req, res) => {

  try {
    // console.log("req.body: ", req.body) 
    client.connect; 
    const collection = client.db("chillAppz").collection("food");
    await collection.insertOne(req.body);
      
    res.redirect('/');
  }
  catch(e){
    console.log(error)
  }
  finally{
   // client.close()
  }

})


app.post('/deletefood/:id', async (req, res) => {

  try {
    console.log("req.parms.id: ", req.params.id) 
    
    client.connect; 
    const collection = client.db("chillAppz").collection("food");
    let result = await collection.findOneAndDelete( { _id: new ObjectId( req.params.id) })
    .then(result => {
      console.log(result); 
      res.redirect('/');
    })
    .catch(error => console.error(error))
  }
  finally{
    //client.close()
  }

})


console.log('in the node console');

app.listen(PORT, () => {
  console.log(`Example app listening on port ${ PORT }`)
})
