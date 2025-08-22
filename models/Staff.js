// models/Staff.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  staffId: String,
  name: String,
  gender: String,
  dob: Date,
  phone: String,
  email: String,
  address: String,
  position: String
});

module.exports = mongoose.model('Staff', staffSchema);
