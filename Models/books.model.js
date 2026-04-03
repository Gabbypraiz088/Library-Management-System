const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true},

    isbn: {
        type: String, 
        unique: true},

    authors: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Author"}],

    status: {
        type: String, 
        enum:["IN", "OUT"], 
        default: "IN"},

    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        default: null},

    issuedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        default: null},

    returnDate: {
        type: Date, 
        default: null},
},
    {timestamps: true}
);

module.exports = mongoose.model("Book", bookSchema);

