# 📚 Library Management System

## 📖 Description

This is a backend API for a Library Management System built with Node.js and Express.
It allows users to manage books, authors, and perform operations like borrowing and returning books.

---

## 🚀 Features

- Create, read, update, and delete books and authors
- Borrow and return books
- Track overdue books
- Role-based authorization

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB / Mongoose
- JSON Web Token (JWT) for authentication

---

## ⚙️ Installation

1. Clone the repository:

```
git clone https://github.com/Gabbypraiz088/Library-Management-System.git
```

2. Navigate into the project:

```
cd Library-Management-System
```

3. Install dependencies:

```
npm install
```

4. Start the server:

```
npm run dev
```

---

## 📌 API Endpoints (Examples)

### Books

- GET /books → Get all books
- POST /books → Create a book
- POST /books/:id/borrow → Borrow a book
- POST /books/:id/return → Return a book

### Authors

- GET /authors → Get all authors
- POST /authors → Create an author

---

## 👤 Author

Gabriel (TS Academy Student)
