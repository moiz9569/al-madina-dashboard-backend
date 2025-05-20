const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const sharp = require('sharp'); // ✅ image processing
const Content = require('../models/content');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload and compress image before sending to Cloudinary
const uploadToCloudinary = async (buffer) => {
  try {
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1200 }) // Resize width (optional)
      .jpeg({ quality: 80 })   // Convert to JPEG and compress
      .toBuffer();

    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'TeachingMethodology' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(compressedBuffer);
    });
  } catch (error) {
    throw new Error('Error compressing image: ' + error.message);
  }
};

// Route to handle the teaching methodology upload
router.post('/upload', upload.single('Image'), async (req, res) => {
  try {
    const { sidebar, timetable, method1, method2, method3, method4 } = req.body;
    let imageUrl = null;

    if (req.file) {
      const uploadedImage = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadedImage.secure_url;
    }

    // Parse methods safely
    const parseMethod = (data) => (typeof data === 'string' ? JSON.parse(data) : data);

    const m1 = parseMethod(method1);
    const m2 = parseMethod(method2);
    const m3 = parseMethod(method3);
    const m4 = parseMethod(method4);

    const existingContent = await Content.findOne({ section: 'Teaching Methodology' });

    if (existingContent) {
      existingContent.sidebar = sidebar;
      existingContent.timetable = timetable;
      existingContent.method1 = { title: m1.title, desc: m1.desc };
      existingContent.method2 = { title: m2.title, desc: m2.desc };
      existingContent.method3 = { title: m3.title, desc: m3.desc };
      existingContent.method4 = { title: m4.title, desc: m4.desc };
      if (imageUrl) existingContent.image = imageUrl;

      const updatedContent = await existingContent.save();
      return res.status(200).json({ message: 'Teaching Methodology updated', content: updatedContent });
    } else {
      const newContent = new Content({
        section: 'Teaching Methodology',
        sidebar,
        timetable,
        method1: { title: m1.title, desc: m1.desc },
        method2: { title: m2.title, desc: m2.desc },
        method3: { title: m3.title, desc: m3.desc },
        method4: { title: m4.title, desc: m4.desc },
        image: imageUrl,
      });

      const savedContent = await newContent.save();
      return res.status(201).json({ message: 'Teaching Methodology created', content: savedContent });
    }
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET API for teaching methodology
router.get('/', async (req, res) => {
  try {
    const data = await Content.findOne({ section: 'Teaching Methodology' });

    if (!data) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Extract method1 through method4
    const methods = [];
    ['method1', 'method2', 'method3', 'method4'].forEach((key) => {
      if (data[key]) methods.push(data[key]);
    });

    const response = {
      sidebar: data.sidebar || '',
      timetable: data.timetable || '',
      methods,
      image: Array.isArray(data.image) ? data.image[0] : data.image || null,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});


module.exports = router;



























// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { v2: cloudinary } = require('cloudinary');
// const Content = require('../models/content');

// // Cloudinary config
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Multer setup
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Upload image to Cloudinary
// const uploadToCloudinary = (buffer) => {
//   return new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//       { resource_type: 'image', folder: 'TeachingMethodology' },
//       (error, result) => {
//         if (error) return reject(error);
//         resolve(result);
//       }
//     );
//     stream.end(buffer);
//   });
// };

// // Route to handle the teaching methodology upload
// router.post('/upload', upload.single('Image'), async (req, res) => {
//   try {
//     // Log the incoming form data
//     console.log(req.body);
//     console.log(req.file); // Log file to verify image upload

//     const { sidebar, timetable, method1, method2, method3, method4 } = req.body;
//     let imageUrl = null;

//     // Check if an image was uploaded
//     if (req.file) {
//       const uploadedImage = await uploadToCloudinary(req.file.buffer);
//       imageUrl = uploadedImage.secure_url;
//     }

//     // Check if Teaching Methodology content already exists
//     const existingContent = await Content.findOne({ section: 'Teaching Methodology' });

//     if (existingContent) {
//       // Update existing content
//       existingContent.sidebar = sidebar;
//       existingContent.timetable = timetable;
//       existingContent.method1 = { title: method1.title, desc: method1.desc };
//       existingContent.method2 = { title: method2.title, desc: method2.desc };
//       existingContent.method3 = { title: method3.title, desc: method3.desc };
//       existingContent.method4 = { title: method4.title, desc: method4.desc };

//       if (imageUrl) {
//         existingContent.image = imageUrl;
//       }

//       const updatedContent = await existingContent.save();
//       return res.status(200).json({ message: 'Teaching Methodology updated', content: updatedContent });
//     } else {
//       // Create new content
//       const newContent = new Content({
//         section: 'Teaching Methodology',
//         sidebar,
//         timetable,
//         method1: { title: method1.title, desc: method1.desc },
//         method2: { title: method2.title, desc: method2.desc },
//         method3: { title: method3.title, desc: method3.desc },
//         method4: { title: method4.title, desc: method4.desc },
//         image: imageUrl,
//       });

//       const savedContent = await newContent.save();
//       return res.status(201).json({ message: 'Teaching Methodology created', content: savedContent });
//     }
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
