const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Import routes
const userRouter = require('./routes/userroutes');
const newsRouter = require('./routes/newsroutes');
const categoryRouter = require('./routes/categoryroutes');

// Database connection
const db = require('./db'); 

// Route setup
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/category', categoryRouter);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
