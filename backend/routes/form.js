const { Form } = require('../models/Form');
const mongoose = require('mongoose');
const { upload } = require('../util/upload');
const routes = require('express').Router();


routes.post('/form' ,(req, res) => {
  console.log('BODY: ',req.body.name);
  upload(req, res, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ success: false, err });
    }
    console.log(res.req.file);
    return res.json({ success: true });
  });
});

module.exports = routes;
