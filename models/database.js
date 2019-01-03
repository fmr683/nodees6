'use strict';

const mysql  = require('mysql2');
var config = require('config');
const ENV = (process.env.ENV || 'dev');
let promisePool;

module.exports =  class Database { 

    constructor() { 
        // Initiate the database connection 
        if (!promisePool) {// if already set then no need to connect again
            const pool = mysql.createPool({
                connectionLimit : config.get(ENV + '.database.connectionLimit'),
                host            : config.get(ENV + '.database.host'),
                user            : config.get(ENV + '.database.user'),
                password        : config.get(ENV + '.database.password'),
                database        : config.get(ENV + '.database.name')
            });
    
            // now get a Promise wrapped instance of that pool
            promisePool = pool.promise();
        }
    } 

    /*
        @param: 
            $query (SQL)
            data {Array} user values (Optional)
        @post: Return the query result
    */
    async dbQuery(query,data) {
        try {
            const [rows,fields] = await promisePool.query(query, data); // this module release the connection automatically
            return rows;
        } catch(error) {
            throw error;
        }
    }
 }