const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: "db", 
    user: "mariadb",
    password: "mariadb",
    database: "mariadb",
    connectionLimit: 5
});

console.log(pool); // línea para verificar la salida

(async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT 1 as val");
        console.log(rows); // Esto debería imprimir: [{ val: 1 }]
    } catch (err) {
        console.error("Error en la consulta simple:", err);
    } finally {
        if (conn) conn.release(); // Cierra la conexión
    }
})();


module.exports = {

    pool, 
    
    insertProduct: async ({ name, description, price, quantity }) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const query = `INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)`;
            const result = await conn.query(query, [name, description, price, quantity]);
            return result;
        } catch (err) {
            console.error("Error en insertProduct:", err);
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },
    
    findAll: async () => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM products");
            return rows;
        } catch (err) {
            console.error("Error en findAll:", err);
            throw err;
        } finally {
            if (conn) conn.release();
        }
    },

    findById: async (id) => {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM products WHERE id = ?", [id]);
            if (rows.length > 0) {
                return rows[0];
            }
            return null;
        } catch (err) {
            console.error("Error en findById:", err);
            throw err;
        } finally {
            if (conn) conn.release();
        }
    }



};
