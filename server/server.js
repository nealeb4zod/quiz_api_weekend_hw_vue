const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.MONGOLAB_URI;

app.use(serveStatic(path.join(__dirname, 'dist')));
app.use(bodyParser.json());

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    const db = client.db('quiz');
    const roomsCollection = db.collection('results');
    const roomsRouter = createRouter(roomsCollection);
    app.use('/api/rooms', roomsRouter);
  })
  .catch(console.err);

const port = process.env.PORT || 80;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
