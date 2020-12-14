var express = require('express');
var router = express.Router();
var books = require('../models/books');

//get global
router.get('/', function(req, res) {
  let result = books.getAll(function(result){
    if (result!=='error'){
      res.json(result)
    }
    else{
      next()
    }
  });
});

//get specific
router.get('/:isbn', function(req, res, next) {
  let isbn = req.params.isbn;
  console.log(isbn)
  books.getOne(isbn,function(result){
    if (result!=='error'){
      res.json(result)
    }
    else{
      next()
    }
  })
});

//add
router.post('/', function(req, res, next) {
  let values = req.body;
  if (!isInteger(values.release_date)){
    values.release_date = parseInt(values.release_date)
  }
  books.postOne(values, function(result){
    if (result!=='error'){
      res.json(result)
    }
    else{
      next()
    }
  })
});

//update
router.post('/:isbn', function(req, res, next) {
  let values = req.body;
  if (!isInteger(values.release_date)){
    values.release_date = parseInt(values.release_date)
  }
  let isbn = req.params.isbn;
  books.updateOne(isbn,values, function(result){
    if (result!=='error'){
      res.json(result)
    }
    else{
      next()
    }
  })
});

//delete
router.delete('/:isbn', function(req, res, next) {
  let isbn = req.params.isbn;
  books.deleteOne(isbn, function(result){
    if (result!=='error'){
      res.json(result)
    }
    else{
      next()
    }
  })
});

module.exports = router;
