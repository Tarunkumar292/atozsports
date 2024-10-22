// Import Mongoose
const mongoose = require('mongoose');
require('dotenv').config();

const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB is connected"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

const db = mongoose.connection;

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

db.once('open', () => {
    console.log("Connection to MongoDB is successful.");
});

module.exports = db; 
