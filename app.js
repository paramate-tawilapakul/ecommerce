const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const app = express();
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');

//start db connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});
//end db connection

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressValidator());

// routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
