const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const { uri } = require('./util/uri.js');
const formdata = require('multer')();


const port = process.env.PORT || 8089;



/**
 * Connect to mongodb
 */

(async () => {
  console.log(uri);
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('MongoDB Connected…');
    })
    .catch((err) => {
      console.log('ERROR OF CONNECT : ', err);
      process.env.CONNECTION_ERROR = {
        err,
        msg: 'Service Unavailable, please try again later!',
      };
    });
})();


/**
 * Midalwares
 */

 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended:true}))
// for parsing multipart/form-data
app.use(formdata.array()); 
app.use(express.static('public'));
/**
 * app.get||post||delete||put @params routname , callback
 */

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "multipart/form-data");
  next();
});

app.use('/api',require('./routes/form'))

// app.post('/api/form', (req, res) => {
//   // if(req.method == 'GET') {
//   //     res.status(404).json({errmsg: 'Error'})
//   // } else {
//   //     res.json({msg: 'Hello Hi'})
//   // }


// });

app.listen(port, () => console.log('Project is runnig'));
