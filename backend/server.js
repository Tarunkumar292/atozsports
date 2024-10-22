const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: process.env.BASE_URL
}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const userRouter = require('./routes/userroutes');
const newsRouter = require('./routes/newsroutes');
const categoryRouter = require('./routes/categoryroutes');

const db = require('./db');

app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/category', categoryRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BASE_URL}`);
});
