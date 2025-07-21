const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const uri = 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);
const dbName = 'codes';

app.get('/api/snippet/:name', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('snippets');

    const doc = await collection.findOne({ name: req.params.name });

    if (!doc) {
      return res.status(404).send({ error: 'Snippet not found' });
    }

    res.send({ snippet: doc.snippet });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server error' });
  }
});

app.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
