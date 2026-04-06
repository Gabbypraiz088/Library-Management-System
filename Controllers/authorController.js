const Author = require("../Models/authors.model");

// POST(Create) Author
exports.createAuthor = async(req,res, next) => {
    try{
        const author = await Author.create(req.body)
        res.status(201).json({message: "Succefully created!", data: author})
    } catch(error){
        next(error);
    }
};

// GET all authors
exports.getAuthors = async(req,res, next) => {
    try{
        const author = await Author.find({})

        res.status(200).json(author)
    } catch(error){
        next(error);
    }
};

// GET a single author
exports.getAuthor = async(req,res, next) => {
    try{
        const {id} = req.params;
        const author = await Author.findById(id);

        if(!author)
            return res.status(404).json({message: "Author doesn't exist"})

        res.status(200).json(author)
    } catch(error){
        next(error);
    }
};

// Update author
exports.updateAuthor = async(req,res, next) => {
    try{
        const {id} = req.params;
        const author = await Author.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

        if(!author)
            return res.status(404).json({message: "Author doesn't exist"})

        res.status(201).json(author)
    } catch(error){
        next(error);
    }
};

// Delete author
exports.deleteAuthor = async(req,res, next) => {
    try{
        const {id} = req.params;
        const author = await Author.findByIdAndDelete(id)

        if(!author)
            return res.status(404).json({message: "Author doesn't exist!"})

        res.status(200).json({message: "Author successfully deleted!"})
    } catch(error){
        next(error);
    }
};

