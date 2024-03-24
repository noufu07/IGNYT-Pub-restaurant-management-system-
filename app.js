const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const multer = require('multer'); // Import Multer





const indexRouter = require('./routes/index');
const recomandedItemRouter = require('./routes/recomandedItem');
const CombosRouter= require('./routes/combos');
const soupRouter= require('./routes/soups');



const commingsoonRouter= require('./routes/commingsoon');
const contactRouter= require('./routes/contact');



const aleRouter= require('./routes/ale');
const lagerRouter= require('./routes/lager');
const stoutRouter= require('./routes/stout');


var adminRouter = require('./routes/admin');

const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/IGNYT', {
  mongoose.connect('mongodb+srv://nowfalnoufu07:516Z3dfi8BGEO0ix@cluster0.ea27kqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Multer setup
const upload = multer();
app.use(upload.any()); // Handle multipart/form-data

app.use('/', indexRouter);
app.use('/recomandedItem', recomandedItemRouter);
app.use('/combos',CombosRouter);
app.use('/soups',soupRouter);


app.use('/commingsoon',commingsoonRouter);
app.use('/contact',contactRouter);



app.use('/ale',aleRouter)
app.use('/lager',lagerRouter)
app.use('/stout',stoutRouter)



app.use('/admin', adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
