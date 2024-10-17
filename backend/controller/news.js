const News = require("../modals/newsschema");

// Add news
const addnews = async (req, res) => {

    console.log(req.file ,);
    

    try {
        let file = req.file
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }
        const imageUrl = "http://localhost:3000"+`/${file?.destination}/${file?.filename}`; 

        const newsData = {
            ...req.body,
            photo:  imageUrl 
        };

        const news = new News(newsData);
        const savedNews = await news.save();
        res.status(201).json({ message: "News added successfully", savedNews });
    } catch (error) {
        res.status(400).json({
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

// Edit news
const editnews = async (req, res) => {
    try {
        const { id } = req.params;
        const newsUpdates = req.body;

        if (req.file) {
            newsUpdates.photo = {
                url: req.file.path,
                filename: req.file.filename,
            };
        }

        const updatedNews = await News.findByIdAndUpdate(id, newsUpdates, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'News not found' });
        }
        res.status(200).json({ message: "News updated successfully", updatedNews });
    } catch (err) {
        console.error(`Error updating news with id ${req.params.id}:`, err);
        res.status(400).json({ error: err.message });
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
        res.status(200).json({ message: 'News deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
};

module.exports = { addnews, getnews, editnews, deletenews };
