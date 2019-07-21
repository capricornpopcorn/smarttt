const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToggleSchema = new Schema({
    switch: Boolean,
    temperature: Boolean,
    volume: Boolean
  });

module.exports = mongoose.model('Toggle', ToggleSchema);