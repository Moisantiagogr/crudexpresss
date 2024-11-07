import mysql from "promise-mysql";
import config from "./../config";

const connection = mysql.createConnection({
    host: config.DB_HOST || 'localhost',         
    database: config.DATABASE || 'node_api',     
    user: config.USER || 'root',                 
    password: config.PASSWORD || 'root',          
    port: config.DB_PORT || 3306                  
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};
