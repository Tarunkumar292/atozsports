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
        required: true
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
    // newsdetails: {
    //     type: String
    // },
    is_trending: {
        type: Boolean,
        default: false
    },
    banner: {
        type: Boolean,
        default: false
    }
});

newsschema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

const News = mongoose.model('News', newsschema);

module.exports = News;
