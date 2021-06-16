const mongoose = require('mongoose');

const imageMetadataSchema = new mongoose.Schema({
    timestamp: Date,
    fileName: String,
  });

module.exports = mongoose.model("ImageMetadata", imageMetadataSchema)
