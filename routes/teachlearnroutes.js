const express = require('express');
const router = express.Router();
const multer = require('multer');
const Content = require('../models/content');

// Multer setup to parse multipart/form-data (even if no files)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST: Upload Teach / Learn Features
router.post('/upload', upload.none(), async (req, res) => {
  try {
    const { section, heading, sub1, sub2, sub3 } = req.body;

    // Basic validation
    if (!section || !heading || !sub1 || !sub2 || !sub3) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if content for the given section already exists
    let content = await Content.findOne({ section });

    if (content) {
      // Update existing document
      content.title = heading;
      content.sub1 = sub1;
      content.sub2 = sub2;
      content.sub3 = sub3;
      await content.save();
      return res.status(200).json({ message: 'Content updated successfully!', content });
    } else {
      // Create new document
      const newContent = new Content({
        section,
        title: heading,
        sub1,
        sub2,
        sub3,
        image: [],
      });

      const savedContent = await newContent.save();
      return res.status(201).json({ message: 'New content created successfully!', content: savedContent });
    }
  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
