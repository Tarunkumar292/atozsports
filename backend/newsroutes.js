const express = require('express');
const router = express.Router();
const { addnews, getnews, editnews, deletenews } = require('./controller/news');


//add news
router.post('/add', addnews)

// get news
router.get('/allnews', getnews); 

// edit news
router.put('/edit', editnews);

//delete news
router.delete('/delete', deletenews)

module.exports = router;
