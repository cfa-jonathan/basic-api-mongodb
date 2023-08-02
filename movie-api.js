const PORT = 3000
const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config()
const app = express()

app.use(cors())


const uri = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.ov8txbf.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.route('/all')
  .get(async (req, res) => {
    let error = null;
    let result = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const collection = client.db("cfa-classwork").collection("basic-api-movies");

      result = await collection.find({}).toArray();
      console.log(result);

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
      console.dir(e);
      error = e;
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    if (error === null) {
      res.json(result.map((value)=>{
        return value.title
      }))
    }
    else {
      res.status(500).send("Failure");
    }
  })
  .delete(async (req, res) => {
    let error = null;
    let result = {};
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const collection = client.db("cfa-classwork").collection("basic-api-movies");

      result = await collection.deleteMany({});
      console.log(result);

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
      console.dir(e);
      error = e;
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    if (error === null) {
      res.sendStatus(200);
    }
    else {
      res.status(500).send("Failure");
    }
  })

app.get('/find', async (req, res) => {
  if (req.query.hasOwnProperty('contains')) {
    let error = null;
    let result = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const collection = client.db("cfa-classwork").collection("basic-api-movies");

      result = await collection.find({ title: { $regex: new RegExp(req.query.contains, 'i') } }).toArray();
      console.log(result);

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
      console.dir(e);
      error = e;
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    if (error === null) {
      res.json(result.map((value)=>{
        return value.title
      }))
    }
    else {
      res.status(500).send("Failure");
    }
  }
  else if (req.query.hasOwnProperty('startsWith')) {
    let error = null;
    let result = [];
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      const collection = client.db("cfa-classwork").collection("basic-api-movies");

      result = await collection.find({ title: { $regex: new RegExp('^'+req.query.startsWith, 'i') } }).toArray();
      console.log(result);

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (e) {
      console.dir(e);
      error = e;
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }

    if (error === null) {
      res.json(result.map((value)=>{
        return value.title
      }))
    }
    else {
      res.status(500).send("Failure");
    }
  }
  else {
	res.status(400).send("No find option supplied");
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
