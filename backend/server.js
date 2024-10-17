//server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


// Import routes
const userRouter = require('./routes/userroutes');
const newsRouter = require('./routes/newsroutes')
const categoryRouter = require('./routes/categoryroutes')

//database
const db = require('./db')
const bodyparser = require('body-parser')

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Route setup
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/category',categoryRouter)

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
