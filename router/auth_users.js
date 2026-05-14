const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => users.some(u => u.username === username);
const authenticatedUser = (username, password) =>
  users.some(u => u.username === username && u.password === password);

// Task 7 — Register
regd_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });
  if (isValid(username))
    return res.status(409).json({ message: "User already exists" });
  users.push({ username, password });
  return res.status(200).json({ message: "User successfully registered. Now you can login." });
});

// Task 8 — Login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password required" });
  if (!authenticatedUser(username, password))
    return res.status(401).json({ message: "Invalid credentials" });
  let accessToken = jwt.sign({ data: password }, 'access', { expiresIn: 60 * 60 });
  req.session.authorization = { accessToken, username };
  return res.status(200).json({ message: "Login successful!", accessToken }); // ✅ corrigido
});

// Task 9 — Add/Update review (authenticated)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.session.authorization.username;
  if (!books[isbn])
    return res.status(404).json({ message: "Book not found" });
  books[isbn].reviews[username] = review;
  return res.status(200).json({
    message: `Review for book ISBN ${isbn} added/updated successfully`,
    reviews: books[isbn].reviews
  });
});

// Task 10 — Delete review (authenticated)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (!books[isbn])
    return res.status(404).json({ message: "Book not found" });
  if (!books[isbn].reviews[username])
    return res.status(404).json({ message: "Review not found" });
  delete books[isbn].reviews[username];
  return res.status(200).json({ message: `Review for ISBN ${isbn} deleted successfully` });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;