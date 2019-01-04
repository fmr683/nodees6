'use strict';
var { promisify } = require('util');
var config = require('config');
var Jimp = require('jimp');
var util = require('../lib/util');
var fs = require('fs');
var responseMessages = require('../lib/response-messages');

/* POST image Upload */
module.exports.upload = async (req, res, next) => {

    //console.log(req.files.length);

    let sizeOf = promisify(require('image-size'));
    let imgError = [];

    req.files.forEach(async (data, index) => {

        try {
            let dimensions = '';
            let videoTypes = util.videoTypes();
            let orgName = req.files[index].originalname;
            let ext = orgName.split('.').pop();
            let tmpPath = req.files[index].path;
            let permanentPath = config.get('thumbnail')  + Date.now() + '.' + ext;

            if (!videoTypes.includes(req.files[index].mimetype)){ // not an image
                dimensions = await sizeOf(req.files[index].path);
            }

            if (videoTypes.includes(req.files[index].mimetype)) { // move the video file to directory
                fs.renameSync(tmpPath, permanentPath);
            }
           
            if (dimensions.width >= config.get('thumbWidth') && dimensions.width >= config.get('thumbHeight')) { // move the image  file to directory
               
                Jimp.read(tmpPath)
                .then(lenna => {
                  return lenna
                    .resize(Jimp.AUTO, config.get('thumbHeight') * 2) // resize
                    .quality(90) // set JPEG quality
                    .write(permanentPath); // save
                })
                .catch(err => {
                    imgError.push(req.files[index].originalname)
                });
            } else if (dimensions !== '') { // failed due to the inappropriate height and width
                imgError.push(req.files[index].originalname)
            }

        } catch (err) {
            imgError.push(req.files[index].originalname)
        }

    });

    if (req.files.length == imgError.length) { // all uploaded media are
        let response = responseMessages.commonResponse(responseMessages.FAIL, "", { 'error': imgError });
        return res.status(400).json(response);
    } else {
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'error': imgError }); // if failed media's are available then include those info
        return res.status(200).json(response);
    }
}