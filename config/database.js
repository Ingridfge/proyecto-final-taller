const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'RH_empresa',  
    port: 3307               
});

pool.query = util.promisify(pool.query);
module.exports = pool;