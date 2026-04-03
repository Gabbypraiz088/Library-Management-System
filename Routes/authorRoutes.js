const express = require("express");

const router2 = express.Router();
const authorController = require("../Controllers/authorController");
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/rolesMiddleware');

// read
router2.get("/", protect, authorizeRoles('student', 'attendant', 'admin'), authorController.getAuthors);

router2.get("/:id", protect, authorizeRoles( 'student', 'attendant', 'admin'), authorController.getAuthor);


//write
router2.post("/", protect, authorizeRoles('admin'), authorController.createAuthor);

router2.put("/:id", protect, authorizeRoles('attendant', 'admin'), authorController.updateAuthor);

router2.delete("/:id", protect, authorizeRoles('admin'), authorController.deleteAuthor);


module.exports = router2;