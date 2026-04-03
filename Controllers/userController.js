require('dotenv').config();
const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { authorizeRoles } = require('../middleware/rolesMiddleware');

exports.createUser = async (req, res) => {
    try{
        const{name, password, email, role, phone} = req.body
        
    // check for existing email
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({message: 'User with Email already exist'})
    }

    // check for existing phone number
    const existingPhone = await User.findOne({phone});
    if(existingPhone){
        return res.status(400).json({message: 'User with same phone number already exist'})
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, password: passwordHash, email, role, phone});
    res.status(201).json({message: 'user created successfully'})

    } catch(err){
        res.status(500).json({message:'unable to create user'})
    }
};

// get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all attendants
exports.getAttendants = async (req, res) => {
  try {
    const attendants = await User.find({ role: 'attendant' }).select('-password');
    res.status(200).json(attendants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE user by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE user by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    // Prevent role change if not admin
    if (updates.role && req.user.role !== 'admin') {
      delete updates.role;
    }

    // Prevent password overwrite without hashing
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "User updated successfully",
      data: user
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async(req, res) => {
  try{
    const{email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: 'User with Email already exist'});
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: 'Invalid credentials'});
    }

    // genetate token
    const token = jwt.sign(
      {
        id:user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    );

    res.json({
      message: 'Login successful', 
    token,
  user: {
    id: user.id,
    name: user.name,
    role: user.role
  }
});

  } catch(error){
    res.status(500).json({message: error.message})
  }
};

