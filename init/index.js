require('dotenv').config({path: __dirname + '/../.env' });
const mysql = require('mysql2/promise');

let connection;
async function main() {
    return await mysql.createConnection({
        host: `${process.env.DB_HOST}`,
        user: `${process.env.DB_USER}`,
        password: `${process.env.DB_PASSWORD}`,
        database: `${process.env.DB_NAME}`
    });
}

main()
    .then((res) => {
        console.log("MySQL DB Connected");
        connection = res;
    })
    .catch((err) => { console.log("Error connecting to MySQL DB:", err) })

let q = `CREATE TABLE school_info (
    ID VARCHAR(36) PRIMARY KEY,
    NAME VARCHAR(255) NOT NULL,
    Address VARCHAR(255) NOT NULL,
    Latitude FLOAT NOT NULL,
    Longitude FLOAT NOT NULL
)`;

async function createTable() {
    return await connection.query(q)
}

createTable()
.then((res)=>{"Table Created:",res})
.catch((err)=>{err})