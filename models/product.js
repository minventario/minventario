const db = require('../repository/repo');

module.exports = {
    findById: async (id) => {
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("SELECT * FROM productos WHERE id = ?", [id]);
            return rows.length > 0 ? rows[0] : null;
        } finally {
            if (conn) conn.release();
        }
    },

    findAll: async () => {
        let conn;
        try {
            conn = await db.getConnection();
            const rows = await conn.query("SELECT * FROM productos");
            return rows;
        } finally {
            if (conn) conn.release();
        }
    },

    create: async (producto) => {
        let conn;
        try {
            conn = await db.getConnection();
            const result = await conn.query("INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)", 
                                           [producto.nombre, producto.descripcion, producto.precio]);
            return result.insertId;
        } finally {
            if (conn) conn.release();
        }
    },

    update: async (id, producto) => {
        let conn;
        try {
            conn = await db.getConnection();
            await conn.query("UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?", 
                             [producto.nombre, producto.descripcion, producto.precio, id]);
            return true;
        } finally {
            if (conn) conn.release();
        }
    },

    delete: async (id) => {
        let conn;
        try {
            conn = await db.getConnection();
            await conn.query("DELETE FROM productos WHERE id = ?", [id]);
            return true;
        } finally {
            if (conn) conn.release();
        }
    }
};

