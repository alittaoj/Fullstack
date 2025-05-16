const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    trim:true
  },
  phone: {
    type: String,
    required: true,
    trim:true
  },
  message: {
    type: String,
    required: true,
    trim:true
  }
    timestamps: true
});

module.exports = mongoose.model('contact', contactSchema);
