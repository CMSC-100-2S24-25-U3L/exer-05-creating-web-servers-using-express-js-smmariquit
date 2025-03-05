/**
 * This program, for the purposes of demonstrating understanding of ExpressJS and internet protocol, does the following:
 * - Adds books to a persistent database (text file) using a POST method
 * - Retrieves book details using a ET method
 * - Implements a .gitignore file to exclude node modules from pushing to GitHub
 * 
 * @author Simonee Ezekiel M. Mariquit
 * @created_date March 5, 2025, 11:30 AM
 * References:
 * [1] How to read file sync https://nodejs.org/api/fs.html#fsreadfilesyncpath-options
 * [2] Empty strings are falsy https://www.nfriedly.com/techblog/2009/07/advanced-javascript-operators-and-truthy-falsy/
 */

// Express is for the server, appendFileSync is for writing to a file.
import express from 'express';
import { appendFileSync, readFileSync } from 'node:fs';

// This is required to use the ExpressJS Module
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// This starts the server
app.listen(3000, () => {
    console.log('Server started at port 3000')
});

// Handle a post request to add a book
app.post('/add-book', (req, res) => {
    // Declare necessary variables from the POST request
    let object_success = {success:"false"};
    let book_name = req.body.book_name;
    let isbn = req.body.isbn;
    let author = req.body.author;
    let year_published = req.body.year_published;

    // If any of the strings return false, it means it is invalid
    if(!book_name || !isbn || !author || !year_published){
        object_success.success = false;
        console.log(object_success)
        return;
    }
    
    // Consolidate the details into one  string
    let data =
        book_name + ',' +
        isbn + ',' +
        author + ',' +
        year_published + '\n';

    // Append to the text file
    try {
        appendFileSync('books.txt', data);
        object_success.success = true;
    } catch (err) {
        console.log(err);
        object_success.success = false;
    }

    // Display whether or not it was a success
    console.log(object_success)
});

// Handle a get request to find by ISBN and Author
app.get('/find-by-isbn-author', (req, res) => {
    let books = [] // Contains all the books
    let book_matches = [] // Contains all matches
    let catalogue = readFileSync('books.txt', 'utf8'); // Read the books from the file
    const lines = catalogue.split("\n"); // Split by line
    for(let i = 0; i < lines.length; i++){ // Split by attribute via comma
        books[i] = lines[i].split(",");
        if(books[i][1] === req.query.isbn && books[i][2] === req.query.author){
            book_matches.push(books[i]) // If match, push the entire book to book_matches
        }
    }
    res.send(book_matches);
});

// Handle a get request to find by Author
app.get('/find-by-author', (req, res) => {
    let books = [] // Contains all the books
    let book_matches = [] // Contains all matches
    let catalogue = readFileSync('books.txt', 'utf8'); // Read the books from the file
    const lines = catalogue.split("\n"); // Split by line
    for(let i = 0; i < lines.length; i++){ // Split by attribute via comma
        books[i] = lines[i].split(",");
        if(books[i][2] === req.query.author){
            book_matches.push(books[i]) // If match, push the entire book to book_matches
        }
    }
    res.send(book_matches);
});