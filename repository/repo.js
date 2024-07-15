const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "db",
    user: "mariadb",
    password: "mariadb",
    database: "mariadb",
    connectionLimit: 5
});

module.exports = Object.freeze({
    findById: async (id) => {
        try {

            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * from cars where id = ?", [id]);
            // rows: [ {val: 1}, meta: ... ]
            if (rows.length > 0){
                return rows[0];
            }
            return null
        } finally {
            if (conn) conn.release(); //release to pool
        }
    },
    findAll: async () => {
        try {

            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * from cars");
            // rows: [ {val: 1}, meta: ... ]
            return rows;
        } finally {
            if (conn) conn.release(); //release to pool
        }
    },
});