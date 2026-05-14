# expressBookReview

# expressBookReview

A server-side online bookstore application built with Node.js and Express, featuring user authentication, book search, and review management.

---

## Project Structure

```
expressBookReview/
├── index.js
├── auth_users.js
├── booksdb.js
├── general.js
└── package.json
```

---

## Task 1 — GitHub Repository (Fork)

**Repository URL:**
```
https://github.com/JoaoOliveiraaa/expressBookReview
```

**cURL command:**
```bash
curl -s https://api.github.com/repos/JoaoOliveiraaa/expressBookReview
```

**Output:**
```json
{
  "full_name": "JoaoOliveiraaa/expressBookReview",
  "name": "expressBookReview",
  "private": false,
  "html_url": "https://github.com/JoaoOliveiraaa/expressBookReview"
}
```

---

## Task 2 — Get All Books

**cURL command:**
```bash
curl -s http://localhost:5000/
```

**Output:**
```json
{
  "1": { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
  "2": { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
  "3": { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
  "4": { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
  "5": { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
  "6": { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
  "7": { "author": "Unknown", "title": "Njál's Saga", "reviews": {} },
  "8": { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
  "9": { "author": "Honoré de Balzac", "title": "Le Père Goriot", "reviews": {} },
  "10": { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
}
```

---

## Task 3 — Get Books by ISBN

**cURL command:**
```bash
curl -s http://localhost:5000/isbn/1
```

**Output:**
```json
{
  "author": "Chinua Achebe",
  "title": "Things Fall Apart",
  "reviews": {}
}
```

---

## Task 4 — Get Books by Author

**cURL command:**
```bash
curl -s http://localhost:5000/author/Austen
```

**Output:**
```json
[
  {
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

---

## Task 5 — Get Books by Title

**cURL command:**
```bash
curl -s http://localhost:5000/title/Pride
```

**Output:**
```json
[
  {
    "author": "Jane Austen",
    "title": "Pride and Prejudice",
    "reviews": {}
  }
]
```

---

## Task 6 — Get Book Review

**cURL command:**
```bash
curl -s http://localhost:5000/review/1
```

**Output:**
```json
{}
```

---

## Task 7 — Register New User

**cURL command:**
```bash
curl -s -X POST http://localhost:5000/customer/register \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"pass123\"}"
```

**Output:**
```json
{
  "message": "User successfully registered. Now you can login."
}
```

---

## Task 8 — Login as Registered User

**cURL command:**
```bash
curl -s -X POST http://localhost:5000/customer/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"testuser\",\"password\":\"pass123\"}" \
  -c cookies.txt
```

**Output:**
```json
{
  "message": "User successfully logged in",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Task 9 — Add / Modify a Book Review

**cURL command:**
```bash
curl -s -X PUT "http://localhost:5000/customer/auth/review/1?review=Great+book" \
  -b cookies.txt
```

**Output:**
```json
{
  "message": "Review for book ISBN 1 added/updated successfully",
  "reviews": {
    "testuser": "Great book"
  }
}
```

---

## Task 10 — Delete a Book Review

**cURL command:**
```bash
curl -s -X DELETE http://localhost:5000/customer/auth/review/1 \
  -b cookies.txt
```

**Output:**
```json
{
  "message": "Review for ISBN 1 deleted successfully"
}
```

---

## Task 11 — general.js (Async/Await with Axios)

**GitHub URL:**
```
https://github.com/JoaoOliveiraaa/expressBookReview/blob/main/general.js
```

The `general.js` file implements all public endpoints using both **Promise callbacks** and **async/await** with Axios:

- `GET /` — Retrieve all books
- `GET /isbn/:isbn` — Search by ISBN
- `GET /author/:author` — Search by Author
- `GET /title/:title` — Search by Title
- `GET /review/:isbn` — Get book reviews
- `GET /async/books` — All books via async/await + Axios
- `GET /async/isbn/:isbn` — By ISBN via Promise callback + Axios
- `GET /async/author/:author` — By Author via async/await + Axios
- `GET /async/title/:title` — By Title via async/await + Axios

---

## How to Run Locally

```bash
# Clone the repository
git clone https://github.com/JoaoOliveiraaa/expressBookReview.git
cd expressBookReview

# Install dependencies
npm install

# Start the server
node index.js
```

Server runs on **http://localhost:5000**