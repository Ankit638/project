const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// Create storage engine
const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/study_assistant',
  file: (req, file) => {
    return {
      bucketName: 'uploads', // The name of the collection where files are stored
      filename: file.originalname
    };
  }
});

const upload = multer({ storage });

module.exports = { upload };
