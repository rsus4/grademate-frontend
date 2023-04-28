const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://rishitgupta:guitarist@cluster0.ph2hn.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.get('/api/collection', (req, res) => {
    const collection = client.db("admin").collection("cluster0");
    collection.find().toArray((err, docs) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.send(docs);
    });
  });

  app.post('/api/collection', (req, res) => {
    const collection = client.db("admin").collection("cluster0");
    console.log(req)
    run().catch(console.dir);
    collection.insertOne(req.body, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }
      res.send(result.ops[0]);
    });
  });
  
app.listen(3003, () => {
    console.log(`Server running on port ${3003}`);
  });

process.on('SIGINT', () => {
    client.close(() => {
      console.log('MongoDB client disconnected');
      process.exit(0);
    });
  });
  