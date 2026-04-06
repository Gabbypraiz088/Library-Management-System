const express = require("express");

const router = express.Router();
const userController = require("../Controllers/userController");
const {protect} = require('../middleware/authMiddleware');
const {authorizeRoles} = require('../middleware/rolesMiddleware');


router.post('/', protect, authorizeRoles('admin'), userController.createUser); 
router.get('/students', protect, authorizeRoles('attendant', 'admin'), userController.getStudents);
router.get('/attendants', protect, authorizeRoles('admin'), userController.getAttendants);
router.put('/:id', protect, authorizeRoles('attendant', 'admin'), userController.updateUser); // handle all deletions
router.delete('/:id', protect, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;