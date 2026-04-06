require('dotenv').config();
const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res, next) => {
    try{
        const{name, password, email, role, phone} = req.body
        
    // check for existing email
    const existingEmail = await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({message: 'Email already exist'})
    }

    // check for existing phone number
    const existingPhone = await User.findOne({phone});
    if(existingPhone){
        return res.status(400).json({message: 'Phone number already exist'})
    }

    // hash password
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await User.create({
        name, password: passwordHash, email, role, phone});
    res.status(201).json({message: 'User created successfully'})

    } catch(error){
        next(error)
    }
};

// get all students
exports.getStudents = async (req, res, next) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.status(200).json(students);
  } catch (error) {
    next(error);
  }
};

// get all attendants
exports.getAttendants = async (req, res, next) => {
  try {
    const attendants = await User.find({ role: 'attendant' }).select('-password');
    res.status(200).json(attendants);
  } catch (error) {
    next(error);
  }
};


// DELETE user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    await user.deleteOne();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
}; 

// UPDATE user by ID
exports.updateUser = async (req, res, next) => {
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

  } catch (error) {
    next(error);
  }
};

exports.login = async(req, res, next) => {
  try{
    const{email, password} = req.body;

    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({message: 'Email already exist'});
    }
    // compare password with hashed password
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
    next(error);
  }
};

