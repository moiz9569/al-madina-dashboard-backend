const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema(
  {
    section: { type: String, required: true },
    title: { type: String, required: false },
    introduction: { type: String, required: false },
    description: { type: String, required: false },
    keystage: { type: String, required: false }, // Keystage contents
    years: { type: String, required: false },    // Years contents
    sidebar: { type: String, required: false },       // Sidebar contents
    timetable: { type: String, required: false },     // Timetable contents
    sub1: { type: String, required: false },
    sub2: { type: String, required: false },
    sub3: { type: String, required: false },
    
    //description: { type: String, required: false },  // Description remains as a string field
    method1: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    method2: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    method3: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    method4: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature1: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature2: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature3: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature4: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature5: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature6: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    feature7: { 
      title: { type: String, required: false },
      desc: { type: String, required: false }
    },
    image: [{ type: String }],  // Image URLs, can store multiple
  },
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);











// const mongoose = require('mongoose');

// const contentSchema = new mongoose.Schema(
//   {
//     section: { type: String, required: true },
//     title: { type: String, required: false },       // ✅ type included
//     description: { type: Object, required: false }, // ✅ type included
//     image: [{ type: String }],
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model('Content', contentSchema);





// const mongoose = require('mongoose');

// const ContentSchema = new mongoose.Schema({
//   section: String,
//   title: String,
//   description: String,
//   image: String
// });

// module.exports = mongoose.model('Content', ContentSchema);
