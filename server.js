const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, file.originalname);
    }
  })
});

// MongoDB connection
const mongoURI = 'mongodb+srv://<kintaMAX>:<Ankitchn1>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema and model for storing queries
const querySchema = new mongoose.Schema({
  query: String,
  response: String
});
const Query = mongoose.model('Query', querySchema);

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');
});

// File retrieval route
app.get('/file/:filename', (req, res) => {
  const { filename } = req.params;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename
  };

  s3.getObject(params, (err, data) => {
    if (err) {
      res.status(404).json({ err: 'No file found' });
    } else {
      res.set('Content-Type', data.ContentType);
      res.send(data.Body);
    }
  });
});

// API route to save query and response
app.post('/api/query', async (req, res) => {
  const { query, response } = req.body;
  const newQuery = new Query({ query, response });
  await newQuery.save();
  res.status(201).send(newQuery);
});

// API route to get all queries
app.get('/api/queries', async (req, res) => {
  const queries = await Query.find();
  res.send(queries);
});

// API route to get a response based on a query
app.post('/api/response', async (req, res) => {
  const { query } = req.body;
  try {
    const response = await axios.post('http://localhost:5001/process_query', { query });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error processing query');
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
