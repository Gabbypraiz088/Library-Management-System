const Author = require("../Models/authors.model");

// POST(Create) Author
exports.createAuthor = async(req,res) => {
    try{
        const author = await Author.create(req.body)
        res.status(201).json({message: "Succefully created!", data: author})
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// GET all authors
exports.getAuthors = async(req,res) => {
    try{
        const author = await Author.find({})

        res.status(200).json(author)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// GET a sungle author
exports.getAuthor = async(req,res) => {
    try{
        const {id} = req.params;
        const author = await Author.findById(id);

        if(!author)
            return res.status(404).json({message: "Author doesn't exist"})

        res.status(200).json(author)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// Update author
exports.updateAuthor = async(req,res) => {
    try{
        const {id} = req.params;
        const author = await Author.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});

        if(!author)
            return res.status(404).json({message: "Author doesn't exist"})

        res.status(201).json(author)
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// Delete author
exports.deleteAuthor = async(req,res) => {
    try{
        const {id} = req.params;
        const author = await Author.findByIdAndDelete(id)

        if(!author)
            return res.status(404).json({message: "Author doesn't exist!"})

        res.status(200).json({message: "Author successfully deleted!"})
    } catch(error){
        res.status(500).json({message: error.message})
    }
};

