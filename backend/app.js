const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const glibalErrorHandler = require('./controllers/errorController');
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
  req.requastTime = new Date().toISOString();
  next();
});

//3) ROUTES
app.use('/api/v1/musics', musicRouter);

app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.statusCode = 404;
  // err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on this server!)`, 404));
});

app.use(glibalErrorHandler);

module.exports = app;
