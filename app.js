var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var booksRouter = require('./routes/books');
var app = express();
const bodyParser = require('body-parser');
const PORT = 8070;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', booksRouter);

app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  console.log(err)
  res.send('error');
});

app.listen(PORT,HOST, () => {
  console.log(`Example app listening at http://localhost:8070`)
})


module.exports = app;
