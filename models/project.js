/*const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Project', projectSchema);*/
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  desc: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

module.exports = mongoose.model('Project', projectSchema);

