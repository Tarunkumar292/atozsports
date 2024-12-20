const News = require("../modals/newsschema");
const fs = require('fs');
const path = require('path');

// Add news
const addnews = async (req, res) => {
    try {
        let file = req.file;
        if (!file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const imageUrl = `https://ean.gocoolcare.com/${file.destination}/${file.filename}`;
        const newsData = { ...req.body, photo: imageUrl };

        const news = new News(newsData);
        const savedNews = await news.save();
        res.status(201).json({
            status: true,
            message: "News added successfully",
            data: savedNews
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "Failed to add news",
            error: error.message
        });
    }
};

// Get all news
const getnews = async (req, res) => {
    try {
        const news = await News.find().sort({ createdAt: -1 });
        res.status(200).json({ news });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// Get news by id
const getnewsbyid = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.status(200).json({ news });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Edit news
const editnews = async (req, res) => {
    try {
        const { id } = req.params;
        const newsUpdates = { ...req.body };

        if (req.file) {
            const file = req.file;
            const imageUrl = `https://ean.gocoolcare.com/uploads/${file.filename}`;
            newsUpdates.photo = imageUrl;
        }

        const updatedNews = await News.findByIdAndUpdate(id, newsUpdates, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({
            message: "News updated successfully",
            data: updatedNews
        });
    } catch (err) {
        console.error(`Error updating news with id ${req.params.id}:`, err);
        res.status(400).json({
            error: err.message,
            message: "Failed to update news"
        });
    }
};

// Delete news
const deletenews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);
        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        const imagePath = path.join(__dirname, "..", "uploads", path.basename(news.photo));
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Failed to delete image:", err);
            }
        });

        res.status(200).json({ message: 'News deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addnews, getnews, getnewsbyid, editnews, deletenews };
