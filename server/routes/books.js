/*  File Name: Midterm Test
    Name: Asheka Hall
    Student Id: 301064568 
    Date: October 25, 2020 
    WebApp: https://comp-f2020-midterm-301064568.herokuapp.com*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    book.find( (err, books) => {
        if (err) {
          return console.error(err);
        }
        else {
          res.render('books/details', {
            title: 'Add Book',
            books: books
          });
        }
      });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let newBook = new book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
     
         });
     
         book.create(newBook, (err)=>{
             if(err){
                 console.log(err);
                 res.end(err);
             }
             else{
                 //refresh the booklist
     
                 res.redirect('/books');
             }
             
         });

});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    
    book.findById(id, (err, editBook) => {
    if(err){
        console.log(err)
        res.end(err);
    }
    else{
        res.render('books/details', 
        {title: 'Edit Book', 
        books: editBook})
    }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    
    let updateBooks = book({
        "_id": id,
        "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    
    book.update({_id: id}, updateBooks, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }
        else{
        
            res.redirect('/books');
        }
    });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    let id = req.params.id;
    
    book.remove({_id: id}, (err) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.redirect('/books');
    }
    });
});


module.exports = router;
