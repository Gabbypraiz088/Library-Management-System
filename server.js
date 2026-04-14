require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authorRouter = require('./Routes/authorRoutes');
const bookRouter = require('./Routes/bookRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000

//middleware parser
app.use(express.json());
app.use(cors());

// routes
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.use('/users', userRouter);

app.get('/library', (req, res) => {
    res.send('Hey There! Welcome To Library Management System!')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Hey Bud! you're connected to database!");
        app.listen(PORT, () => {
    console.log(`Hey Bud!, your server is listening on Port ${PORT}`);
    })
    })
    .catch((err) => {
        console.log("Hey Bud! connection failed!");
        console.error(err);
    });