// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Import routes
// const mainPageRoutes = require('./routes/mainpageroutes');
// const seniorSchoolRoutes = require('./routes/seniorschoolroutes');
// const middleSchoolRoutes = require('./routes/middleschoolroutes');
// const whyChooseRoutes = require('./routes/whychooseroutes');
// const learningJourneyRoutes = require('./routes/learningjourneyroutes');
// const teachingMethodologyRoutes = require('./routes/teachingmethodologyroutes');
// const featuresRoutes = require('./routes/featuresroutes');
// const teachLearnRoutes = require('./routes/teachlearnroutes');

// // Mount routes
// app.use('/api/mainpage', mainPageRoutes);
// app.use('/api/seniorschool', seniorSchoolRoutes);
// app.use('/api/middleschool', middleSchoolRoutes);
// app.use('/api/whychoose', whyChooseRoutes);
// app.use('/api/learningjourney', learningJourneyRoutes);
// app.use('/api/teachingmethodology', teachingMethodologyRoutes);
// app.use('/api/features', featuresRoutes);
// app.use('/api/teachlearn', teachLearnRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from /uploads

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const mainPageRoutes = require('./routes/mainpageroutes');
const seniorSchoolRoutes = require('./routes/seniorschoolroutes');
const middleSchoolRoutes = require('./routes/middleschoolroutes');
const whyChooseRoutes = require('./routes/whychooseroutes');
const learningJourneyRoutes = require('./routes/learningjourneyroutes');
const teachingMethodologyRoutes = require('./routes/teachingmethodologyroutes');
const featuresRoutes = require('./routes/featuresroutes');
const teachLearnRoutes = require('./routes/teachlearnroutes');

// Mount routes
app.use('/api/mainpage', mainPageRoutes);
app.use('/api/seniorschool', seniorSchoolRoutes);
app.use('/api/middleschool', middleSchoolRoutes);
app.use('/api/whychoose', whyChooseRoutes);
app.use('/api/learningjourney', learningJourneyRoutes);
app.use('/api/teachingmethodology', teachingMethodologyRoutes);
app.use('/api/features', featuresRoutes);
app.use('/api/teachlearn', teachLearnRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






















// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const contentRoutes = require('./routes/contentroutes');

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads')); // serve uploaded images
// app.use('/api/content', contentRoutes);

// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
