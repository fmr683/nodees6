

const Joi = require('joi');

// Libraries
var responseMessages = require('../lib/response-messages');

exports.signUp = function (req, res, next) {
    const data = req.body;

    // define the validation schema
     const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        // password is required
        password: Joi.string().min(6).required()

    });

    Joi.validate(data, schema, (err, value) => {

        if (err) {
            // send a 422 error response if validation fails
            response = responseMessages.commonResponse(responseMessages.FAIL, data,'',err.details[0].message);
            res.status(422).json(response);
        } else {
            next();
        }

    });
}

exports.login = function (req, res, next) {
    const data = req.body;

    // define the validation schema
     const schema = Joi.object().keys({

        // email is required
        // email must be a valid email string
        email: Joi.string().email().required(),

        // password is required
        password: Joi.string().min(6).required()

    });

    Joi.validate(data, schema, (err, value) => {

        if (err) {
            // send a 422 error response if validation fails
            response = responseMessages.commonResponse(responseMessages.FAIL, data,'',err.details[0].message);
            res.status(422).json(response);
        } else {
            next();
        }

    });
}

exports.get = function (req, res, next) {
    next();
}