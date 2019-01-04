

const Joi = require('joi');

// Libraries
var util = require('../lib/util');
var responseMessages = require('../lib/response-messages');


exports.fileFilterValidation = function (req, file, cb) {

    let fileTypes = util.videoTypes().concat(util.imageTypes());

    if (!fileTypes.includes(file.mimetype)) { // Not found
        // To reject this file pass `false`, like so:
        cb(new Error(`Invalid file type - ${file.originalname}`));
    } else {
        // To accept the file pass `true`, like so:
        cb(null, true)
    }

}
