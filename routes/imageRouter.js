const express = require('express');
const router = express.Router();
var multer  = require('multer')
var path = require('path')
var uuid = require('uuid');

const Image = require('../models/Image');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now();
      cb(null, uuid.v4() + timestamp + path.extname(file.originalname))
    },
  })

var upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (acceptedFileTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      }
});


router.post('/metadata', upload.single('file'), function(req, res) {
    const file = req.file;

    const timestamp = new Date();
    const image = new Image({
        timestamp,
        fileName: file.filename,
    })

    image.save((err, image) => {
        if (err) {
            console.error(`Error while saving metadata for ${fileName}`)
            res.status(500);
            res.json();
        }
        console.log(`image metadata saved for ${image.fileName}`)
        res.status(201);
        res.json({ message: "SUCCESS"});
    });
});

module.exports = router;