/*
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "db",
    user: "mariadb",
    password: "mariadb",
    database: "mariadb",
    connectionLimit: 5
});

 // Exportar el pool de conexiones de manera segura
module.exports = Object.freeze({
    getConnection: () => pool.getConnection(),
    query: (sql, values) => pool.query(sql, values)
}); */




/* --
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
}); ---- */ 





const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "db", // Cambia esto si estás usando un contenedor u otra configuración
    user: "mariadb",
    password: "mariadb",
    database: "mariadb",
    connectionLimit: 5
});

module.exports = Object.freeze({
    findAll: async () => {
        let conn;
        try {
            conn = await pool.getConnection();
            // Ajusta el nombre de la tabla a tu esquema de base de datos
            const rows = await conn.query("SELECT * FROM products"); // Asegúrate de que el nombre de la tabla es 'products'
            return rows;
        } catch (err) {
            console.error("Error en findAll:", err);
            throw err;
        } finally {
            if (conn) conn.release(); // Devuelve la conexión al pool
        }
    },

    findById: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            // Ajusta el nombre de la tabla a tu esquema de base de datos
            const rows = await conn.query("SELECT * FROM products WHERE id = ?", [id]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error("Error en findById:", err);
            throw err;
        } finally {
            if (conn) conn.release(); // Devuelve la conexión al pool
        }
    }
});
