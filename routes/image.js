'use strict';

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const config = require('config');
const validator = require('../validators/image');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, config.get('tmpPath'));
    }/*,
    filename: function(req, file, cb) {
        let orgName = file.originalname;
        let ext = orgName.split('.').pop()
        cb(null, Date.now() + '.' + ext);
    }*/
})

const upload = multer({ storage: storage, fileFilter: validator.fileFilterValidation, limits: {
    fileSize: 1024 * 1024 * config.get('fileSize') // 5 mb
}});


const imageController = require('../controllers/image');

/* POST image upload */
router.post('/', upload.array('fileData'), imageController.upload);


module.exports = router;
