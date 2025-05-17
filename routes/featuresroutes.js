const express = require('express');
const router = express.Router();
const multer = require('multer');
const Content = require('../models/content');

// Multer setup (no file upload, just form-data parsing)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to safely parse JSON fields
const safeParse = (str) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};

// POST route to upload school features
router.post('/upload', upload.none(), async (req, res) => {
  try {
    console.log('REQ.BODY:', req.body);

    const {
      feature1,
      feature2,
      feature3,
      feature4,
      feature5,
      feature6,
      feature7,
    } = req.body;

    const parsed = {
      feature1: safeParse(feature1),
      feature2: safeParse(feature2),
      feature3: safeParse(feature3),
      feature4: safeParse(feature4),
      feature5: safeParse(feature5),
      feature6: safeParse(feature6),
      feature7: safeParse(feature7),
    };

    // Validate parsed fields
    if (Object.values(parsed).some(val => val === null)) {
      return res.status(400).json({ error: 'Invalid JSON in one or more features' });
    }

    let content = await Content.findOne({ section: 'features' });

    if (content) {
      Object.assign(content, parsed);
      await content.save();
      return res.status(200).json({ message: 'Features updated', content });
    } else {
      const newContent = new Content({
        section: 'features',
        ...parsed
      });
      const savedContent = await newContent.save();
      return res.status(201).json({ message: 'Features created', content: savedContent });
    }
  } catch (error) {
    console.error('Error uploading features:', error);
    return res.status(500).json({ error: 'Server error while uploading features' });
  }
});

module.exports = router;
