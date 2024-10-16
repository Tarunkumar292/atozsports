const express = require('express');
const router = express.Router();
const { addnews, getnews, editnews, deletenews } = require('../controller/news');

// Add news
router.post('/add', addnews);

// Get all news
router.get('/allnews', getnews);

// Edit news 
router.put('/edit/:id', editnews);

// Delete news
router.delete('/delete/:id', deletenews);

module.exports = router;
