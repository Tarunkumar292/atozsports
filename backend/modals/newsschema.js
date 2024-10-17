const mongoose = require('mongoose');
const slugify = require('slugify');

// Define the schema for news
const newsschema = new mongoose.Schema({
    photo: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
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
        type: String,
        required:true
    },
    is_trending: {
        type: Boolean,
        default: false
    },
    banner: {
        type: Boolean,
        default: false
    }
});

// Generate slug before saving
newsschema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const News = mongoose.model('News', newsschema);

module.exports = News;
