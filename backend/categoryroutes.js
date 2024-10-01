const express = require('express');
const router = express.Router();
const { addcategory, getcategory, editcategory, deletecategory } = require('./controller/category');


//add news
router.post('/add', addcategory)

// get news
router.get('/allcategory', getcategory); 

// edit news
router.put('/edit/:id', editcategory);

//delete news
router.delete('/delete/:id', deletecategory)

module.exports = router;
