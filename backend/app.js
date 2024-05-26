const express = require('express');
const morgan = require('morgan');

const musicRouter = require('./routes/musicRoutes');

const app = express();

// 1 MIDDLEWARES
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
// app.use(express.static(`${__dirname}/public}`))

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requastTime = new Date().toISOString();
  next();
});

//3) ROUTES
app.use('/api/v1/musics', musicRouter);

module.exports = app;
