const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  phone: {type: String, required: true},

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email']
  },

  password: { type: String, required: true },

  role: {
    type: String,
    enum: ['student', 'attendant', 'admin'],
    default: 'student'
  },
  
  staffId: {
  type: String,
  required: function () {
    return this.role === 'attendant' || this.role === 'admin';
  }
},

studentId: {
  type: String,
  required: function () {
    return this.role === 'student';
  }
},

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)