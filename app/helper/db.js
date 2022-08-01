require('dotenv').config()

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_DATABASE);

const mariadb = require('mariadb');
let pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

module.exports = {
    request: async function (query) {
        return await pool.getConnection().then(async (conn) => {
            return await conn.query(query)
                .then((data) => {
                    conn.end();
                    return data;
                })
                .catch(err => {
                    console.log('error in query');
                    console.log(err);
                    conn.end();
                    return null;
                })
        }).catch(err => {
            console.log('error in connection');
            return null;
        });
    },
    
    requestWithData: async function (query,query_data) {
        return await pool.getConnection().then(async (conn) => {
            return await conn.query(query, query_data)
                .then((data) => {
                    conn.end();
                    return data;
                })
                .catch(err => {
                    console.log('error in with data');
                    console.log(err);
                    conn.end();
                    return null;
                })
        }).catch(err => {
            console.log('error in connection');
            return null;
        });
    },
}