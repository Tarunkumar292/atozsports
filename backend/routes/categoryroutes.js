const express = require('express');
const router = express.Router();
const { addcategory, getcategory, editcategory, deletecategory } = require('../controller/category');

// Add category
router.post('/add', addcategory);

// Get all categories
router.get('/allcategory', getcategory);

// Edit category by ID
router.put('/edit/:id', editcategory);

// Delete category by ID
router.delete('/delete/:id', deletecategory);

module.exports = router;
