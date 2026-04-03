const express = require("express");

const router1 = express.Router();
const bookController = require("../Controllers/bookController");
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/rolesMiddleware');


// Borrowing & return services

router1.post("/:id/borrow", protect, authorizeRoles('student'), bookController.borrowBook);

router1.post("/:id/return", protect, authorizeRoles('attendant', 'admin'), bookController.returnBook);

//overdue books
router1.get("/overdue", protect, authorizeRoles('admin'), bookController.getOverdueBooks);

// read
router1.get("/", protect, authorizeRoles('attendant', 'admin'), bookController.getBooks);

router1.get("/:id", protect, authorizeRoles('student', 'attendant', 'admin'),bookController.getBook);

// write
router1.post("/", protect, authorizeRoles('admin'), bookController.createBook);

router1.put("/:id", protect, authorizeRoles('attendant', 'admin'), bookController.updateBook);

router1.delete("/:id", protect, authorizeRoles('admin'), bookController.deleteBook);


module.exports = router1;