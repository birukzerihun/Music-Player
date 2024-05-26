const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Database connected successfully 🚀'));

const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('app listening on port ' + port);
});
