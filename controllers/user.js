'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const config = require('config');

// Libraries
var responseMessages = require('../lib/response-messages');

/* POST User signup */
module.exports.signUp = async (req, res, next) => {

    try {

        let salt = bcrypt.genSaltSync(config.get('saltRound'));
        req.body.password = bcrypt.hashSync(req.body.password, salt);

        let user = new User();
        let data = await user.createUser(req.body);
        let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
        return res.status(200).json(response);
    }
    catch(error) {
        console.error(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
    }
}


/* POST User login */
module.exports.login = async (req, res, next) => {

    try {

        let user = new User();
        let data = await user.login(req.body);

        if (data == '' || data == undefined) { // No result
            let response = responseMessages.commonResponse(responseMessages.AUTH_FAILED);
            return res.status(404).json(response);
        } else if (!bcrypt.compareSync(req.body.password, data[0].password)) { // password mismatch
            let response = responseMessages.commonResponse(responseMessages.AUTH_FAILED);
            return res.status(404).json(response);
        } else { // result found
            let jwt = user.getJwt(data[0]);
            data[0].accessToken = jwt;
            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
            return res.status(200).json(response);
        }
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
    }
}


/* GET User login */
module.exports.get = async (req, res, next) => {
    try {

        let user = new User();
        let data = await user.get(req.params);

        if (data == '' || data == undefined) { // No result
            let response = responseMessages.commonResponse(responseMessages.AUTH_FAILED);
            return res.status(404).json(response);
        } else { // result found
            let response = responseMessages.commonResponse(responseMessages.SUCCESS, "", { 'user': data });
            return res.status(200).json(response);
        }
    }
    catch(error) {
        console.log(error);
        let response = responseMessages.commonResponse(responseMessages.FAIL);
        return res.status(500).json(response);
    }
}