const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const userRouter = require('./routes/userroutes');
const newsRouter = require('./routes/newsroutes');
const categoryRouter = require('./routes/categoryroutes');

dotenv.config();

const app = express();

// Database connection
const dbURL = process.env.MONGODB_URL || "mongodb+srv://atozsports:abc%40123@cluster0.ahe9u.mongodb.net/"; 

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected"))
.catch(err => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route setup
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/category', categoryRouter);

// Root route
app.get('/', (req, res) => {
    res.send(`Server is running on ${process.env.PORT || 5001}`);
});

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`);
});
