const express = require('express');
const Category = require('../modals/categoryschema')
const bcrypt = require('bcrypt');

// Add category
const addcategory = async (req, res) => {
    try {
        const categoryData = req.body;
        console.log(categoryData ,"categoryData");
        
        const category = new Category(categoryData); 

        const savedcategory = await category.save();
        res.status(200).json({message:"category saved successfully", savedcategory});
    } catch (error) {
        res.status(500).json({
            message: "Failed to add category", 
            error: error.message
        });
    }
}

// Get all category
const getcategory = async (req, res) => {
    try {
        const category = await Category.find().sort({ createdAt: -1 });
        res.status(200).json({ category });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Edit category
const editcategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = req.body;

        const updatedcategory = await Category.findByIdAndUpdate(id, category, { new: true });
        if (!updatedcategory) {
            return res.status(404).json({ message: 'category not found' });
        }
        res.status(200).json({ message: "category updated successfully", updatedcategory });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

// Delete category
const deletecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'category not found' });
        }
        res.status(200).json({ message: 'category deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
}

module.exports = { addcategory, getcategory, editcategory, deletecategory };
