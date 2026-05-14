const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const axios = require('axios');
const public_users = express.Router();
const BASE_URL = "http://localhost:5000";

// Task 2 — Get all books
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Task 3 — Get by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) return res.status(200).json(books[isbn]);
  return res.status(404).json({ message: "Book not found" });
});

// Task 4 — Get by Author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const result = Object.values(books).filter(b =>
    b.author.toLowerCase().includes(author.toLowerCase())
  );
  if (result.length > 0) return res.status(200).json(result);
  return res.status(404).json({ message: "No books found for this author" });
});

// Task 5 — Get by Title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const result = Object.values(books).filter(b =>
    b.title.toLowerCase().includes(title.toLowerCase())
  );
  if (result.length > 0) return res.status(200).json(result);
  return res.status(404).json({ message: "No books found for this title" });
});

// Task 6 — Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) return res.status(200).json(books[isbn].reviews);
  return res.status(404).json({ message: "Book not found" });
});

// ─── Task 11: Async/Await with Axios ────────────────────────────────────────

// Task 11.1 — Get all books using async/await
public_users.get('/async', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11.2 — Get book by ISBN using async/await
public_users.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const response = await axios.get(`${BASE_URL}/isbn/${isbn}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "Book not found", error: error.message });
  }
});

// Task 11.3 — Get books by Author using async/await
public_users.get('/async/author/:author', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${encodeURIComponent(req.params.author)}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found", error: error.message });
  }
});

// Task 11.4 — Get books by Title using async/await
public_users.get('/async/title/:title', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${encodeURIComponent(req.params.title)}`);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(404).json({ message: "No books found", error: error.message });
  }
});

module.exports.general = public_users;