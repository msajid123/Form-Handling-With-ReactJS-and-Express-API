const mongoose = require('mongoose')
const multer = require('multer');
const { uri } = require('../util/uri');
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')

let conn = mongoose.connection;
let gfs
conn.once('open', () => {
    //initialize our stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
})

// Create storage engine
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = { filename: filename, bucketName: 'uploads' };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage }).single('file');

module.exports = {gfs, upload}