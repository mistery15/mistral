const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const movieRoutes = require('./routes/movieRoutes');

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const fileName = new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname.replace(/ /g, '-');

    if (req.body.main_image === file.originalname) {
      req.body.main_image = path.join('images', fileName);
    }
    cb(null, fileName);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).fields([
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'cover_image', maxCount: 1 }
  ])
);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET'
  );

  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, SessionId');
  res.setHeader('Content-Type', 'application/json')
  next();
});

app.use((req, res, next) => {
  if (req.headers.apikey !== 'A5Nf5f5DS123Mddnad31mf1d1nF4K1ms3D5GgrasR54md4DS3dsa21')
    next(new Error('Invalid api key'));

  next();
})

app.use('', movieRoutes);


app.use(function (req, res, next) {
  var err = new Error('The endpoint you are trying to reach does not exist!');
  err.statusCode = 404;
  next(err);
});

app.use((error, req, res, next) => {
  const code = error.code;
  const status = error.statusCode || 500;
  const message = error.message || 'Something went wrong';
  const data = error.data;
  res.status(status).json({ code: code, message: message, data: data });
});

mongoose
  .connect(
    'mongodb+srv://<username>:<password>@<cluster>/mistral?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }
  )
  .then(() => {
    app.listen(8080);
  })
  .catch(err => console.log(err));
