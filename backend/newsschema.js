const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the schema for news
const newsschema = new mongoose.Schema({
    photo: {
        type: String, 
        required: true
    },
    category: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        required: true
    },
    newsdetails: {
        type: String
    }
});

// Automatically generate the slug before saving the news document
newsschema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

// Create the model
const News = mongoose.model('News', newsschema);

module.exports = News;
