const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const Content = require('../models/content');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image', folder: 'MiddleSchool' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
};

router.post('/upload', upload.array('image', 10), async (req, res) => {
  try {
    console.log(req.files); // Log files to verify the upload

    const { title, keystage, years } = req.body;
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => uploadToCloudinary(file.buffer));
      const results = await Promise.all(uploadPromises);
      imageUrls = results.map(result => result.secure_url);
    }

    // Check if Main Page content already exists
    const existingContent = await Content.findOne({ section: 'Middle School' });

    if (existingContent) {
      existingContent.title = title;
      existingContent.keystage = keystage;
      existingContent.years = years;
      if (imageUrls.length > 0) existingContent.image = imageUrls;

      const updatedContent = await existingContent.save();
      return res.status(200).json({ message: 'Middle School content updated', content: updatedContent });
    } else {
      const newContent = new Content({
        section: 'Middle School',
        title,
        keystage, 
        years,
        image: imageUrls,
      });

      const savedContent = await newContent.save();
      return res.status(201).json({ message: 'Middle School content created', content: savedContent });
    }
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET middle school
router.get('/', async (req, res) => {
  try {
    const content = await Content.findOne({ section: 'Middle School' });
    if (!content) return res.status(404).json({ message: 'Middle School content not found' });
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Middle School content' });
  }
});


module.exports = router;
