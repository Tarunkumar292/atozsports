const mongoose = require('mongoose');
const slugify = require('slugify');

const categoryschema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    add_page: {
        type: Boolean,
        default: false
    },
    is_trending: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

categoryschema.pre('save', function (next) {
    if (this.isModified('category')) {
        this.slug = slugify(this.category, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model('Category', categoryschema);
module.exports = Category;
