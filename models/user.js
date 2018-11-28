'use strict';

const Model = require("./Model");
const jwt = require('jsonwebtoken');
const config = require('config');
const ENV = (process.env.ENV || 'dev');

module.exports = class User extends Model { 
    constructor() { 
        super(); 
    } 

    /*
        @param:
            Data {Object} : email, password
        Return db insertion status
    */
    createUser(data) {

        let dataValues = [data.email, data.password];
        return this.dbQuery('INSERT INTO users (email, password) VALUES ( ? , ? )', dataValues);
    }

    /*
        @param:
            Data {Object} : email
        Return user result
    */
    login(data) {
        let dataValues = [data.email];
        return this.dbQuery('SELECT id, email, password FROM users WHERE email = ? LIMIT 1', dataValues);
    }

    /*
        @param:
            Data {Object} : id
        Return user result
    */
    get(data) {
        let dataValues = [data.id];
        return this.dbQuery('SELECT id, email FROM users WHERE id = ? LIMIT 1', dataValues);
    }

    /*
        @param:
            User object details eg: id, type, email, fname
        Return the JWT token
    */
    getJwt (user) {

        let data = {
            userId: user.id, 
            email: user.email, 
            type: user.type,
            fname: user.fname
        };
        return jwt.sign(data, config.get(ENV + '.jwtSecKey'));
    }


    validateJwt (token) {

        var decoded = null;
        try {
            decoded = jwt.verify(token, config.get(ENV + '.jwtSecKey'));
        } catch(err) {
          // err
        }

        return decoded;
    }
 }