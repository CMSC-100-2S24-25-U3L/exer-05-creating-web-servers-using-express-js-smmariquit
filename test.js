/**
 * This is the request file for a program that demonstrates internet protocol via a book transfer system.
 * It uses the needle package to send requests.
 * 
 * @author Simonee Ezekiel M. Mariquit
 * @created_date March 5, 2025, 11:30 AM
 */

import needle from 'needle';

// Sample POST request 1
needle.post(
    'http://localhost:3000/add-book',
    { book_name: "Harry Potter and the Philosopher's Stone",
      isbn: "978-07475-3269-9",
      author: "JK Rowling",
      year_published: "1997" },
    (err, res) => {
        console.log(res.body);
    }
)

// Sample POST request 2
needle.post(
    'http://localhost:3000/add-book',
    { book_name: "Harry Potter and the Chamber of Secrets",
      isbn: "0-7475-3849-2",
      author: "JK Rowling",
      year_published: "1998" },
    (err, res) => {
        console.log(res.body);
    }
)

// Sample POST request 2
needle.post(
    'http://localhost:3000/add-book',
    { book_name: "The Little Prince",
      isbn: "978-0156012195",
      author: "Antoine Saint-Exupery",
      year_published: "1943" },
    (err, res) => {
        console.log(res.body);
    }
)