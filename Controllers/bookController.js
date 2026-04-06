const Book = require("../Models/books.model");

// Create book
exports.createBook = async(req, res, next) => {
    try{
        const book = await Book.create(req.body);
        res.status(201).json({messsage: "Book successfully created", data: book})

    } catch(error){
        if (error.code === 11000) {
    return res.status(400).json({message: "ISBN already exists"})
    }

        next(error); // 🔥 send to global handler
    }
};

// GET All Books + Pagination
exports.getBooks = async(req, res, next) => {
    try {
    const {page = 1, limit = 10, search} = req.query;

    const query = search
    ? {title: {$regex: search, $options:"i"}}
    : {};

    const book = await Book.find(query)
        .populate("authors")
        .skip((page -1) * limit )
        .limit(parseInt(limit));

    res.json(book)
    } catch(error){
        next(error);
    }
};

// GET a single Book
exports.getBook = async(req, res, next) => {
    try{
        const book = await Book.findById(req.params.id)
        .populate("authors")
        .populate("borrowedBy")
        .populate("issuedBy");
    
    if(!book)
        return res.status(404).json({msg: "Not found!"})
    res.json(book);

    } catch(error){
        next(error);
    }
};

// Update a book
exports.updateBook = async(req, res, next) => {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body, 
            {new: true, runValidators: true});
        
        if(!book)
            return res.status(404).json({message: "Book not found!"});
        res.status(201).json(book);

    } catch(error){
        next(error);
    }
};

// Delete a book
exports.deleteBook = async(req, res, next) => {
    try{
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);

        if(!book)
            return res.status(404).json({message:"Book not found!"});
        res.status(200).json({message: "Successfully deleted!"})

    } catch(error){
       next(error);
    }
};

// Services 

//Book Borrowing Logic
exports.borrowBook = async(req, res, next) => {
    try{
        const {studentId, attendantId, returnDate} = req.body;
        const book = await Book.findById(req.params.id);

    if (!book)
        return res.status(404).json({msg: "Book not found!"});

    if(book.status ==="OUT")
        return res.status(400).json({msg: "Book already borrowed!"});

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();

    res.json({msg: "Book successfully borrowed!"});

    }catch(error){ 
        next(error);
    }
};

// Book return logic
exports.returnBook = async(req, res, next) => {
    try{
        const {studentId, attendantId, returnDate} = req.body;
        const book = await Book.findById(req.params.id);

    if (!book)
        return res.status(404).json({msg: "Book not found!"});

    if(book.status ==="IN")
        return res.status(400).json({msg: "Book already returned!"});

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.json({msg: "Book successfully returned!"});

    }catch(error){ 
        next(error);
    }
};


// Overdue check
exports.getOverdueBooks = async(req, res, next) =>{
    try{
const now = new Date();

const overdueBooks = await Book.find({
  status: "OUT",
  returnDate: { $lt: now }
}).populate("borrowedBy");

res.json(overdueBooks);
    }catch(error){
        next(error);
    }
};

