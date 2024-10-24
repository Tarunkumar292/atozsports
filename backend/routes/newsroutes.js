const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); 
const { addnews, getnews, getnewsbyid, editnews, deletenews } = require('../controller/news');
const uploadSingle = require('../middleware/uploadSingle');

// Add news 
router.post('/add', uploadSingle.single('photo'), addnews);

// Get all news
router.get('/allnews', getnews);

//get news by id
router.get('/getnews/:id' , getnewsbyid)

// Edit news 
router.put('/edit/:id', upload.single('photo'), editnews);

// Delete news
router.delete('/delete/:id', deletenews);

module.exports = router;
