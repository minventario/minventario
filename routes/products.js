const express = require('express');
const router = express.Router();
const db = require('../repository/repo'); // Importa el pool de conexiones
const { pool } = require('../repository/repo');


// Obtener todos los productos
router.get('/', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection(); // Obtén una conexión del pool
    const products = await conn.query('SELECT * FROM products'); // Realiza la consulta
    res.render('products/index', { products });
  } catch (err) {
    res.status(500).send(err.message); // Maneja errores
  } finally {
    if (conn) conn.end(); // Asegúrate de cerrar la conexión
  }
});

// Formulario para crear un nuevo producto
router.get('/new', (req, res) => {
  res.render('products/new');
});


// Ruta para mostrar el formulario de "Nuevo Producto"
router.get('/products/new', (req, res) => {
  res.render('products/new'); // Renderiza el formulario de creación de productos
});


// Ruta para manejar el POST de productos (creación de un nuevo producto)
router.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
      // Inserta el producto en la base de datos usando la función insertProduct de repo.js
      const result = await db.insertProduct({ name, description, price, quantity });
      res.redirect('/'); // Redirige a la lista de productos después de guardar
  } catch (err) {
      console.error("Error al guardar el producto:", err);
      res.status(500).send('Error al guardar el producto');
  }
}); 


// Ruta para manejar el formulario de nuevo producto
router.post('/', async (req, res) => {
  try {
      const { name, description, price, quantity } = req.body;
      await db.insertProduct(name, description, price, quantity);
      res.redirect('/'); // Redirige al índice después de agregar el producto
  } catch (err) {
      console.error('Error al agregar el producto:', err);
      res.status(500).send('Error al agregar el producto');
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const { name, description, price, quantity } = req.body; 

  // Validación de los datos recibidos
  if (!name || !description || !price || !quantity) {
    return res.status(400).send('Todos los campos son requeridos'); // Responde con un error 400 si faltan campos
  }

  const query = 'INSERT INTO products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
  let conn;

  try {
    conn = await pool.getConnection(); // Obtén una conexión del pool de conexiones
    await conn.query(query, [name, description, price, quantity]); // Ejecuta la consulta para insertar el producto
    res.redirect('/products'); // Redirige al usuario a la lista de productos
  } catch (err) {
    console.error('Error en la consulta SQL:', err); // Imprime el error en la consola para depuración
    res.status(500).send('Error al crear el producto'); // Responde con un error 500 si ocurre un error
  } finally {
    if (conn) conn.release(); // Asegúrate de liberar la conexión al pool, sin importar si hubo un error o no
  }
});

// Formulario para editar un producto
router.get('/:id/edit', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
    conn = await pool.getConnection(); // Obtén una conexión del pool
    const result = await conn.query('SELECT * FROM products WHERE id = ?', [id]);
    if (result.length === 0) return res.status(404).send('Producto no encontrado');
    res.render('products/edit', { product: result[0] });
  } catch (err) {
    res.status(500).send(err.message); // Maneja errores
  } finally {
    if (conn) conn.end(); // Asegúrate de cerrar la conexión
  }
});

// Actualizar un producto
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;
  const query = 'UPDATE products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
  let conn;
  try {
    conn = await pool.getConnection(); // Obtén una conexión del pool
    await conn.query(query, [name, description, price, quantity, id]);
    res.redirect('/products');
  } catch (err) {
    res.status(500).send(err.message); // Maneja errores
  } finally {
    if (conn) conn.end(); // Asegúrate de cerrar la conexión
  }
});

// Eliminar un producto
router.post('/:id/delete', async (req, res) => {
  const { id } = req.params;
  let conn;
  try {
      conn = await pool.getConnection();
      const result = await conn.query("DELETE FROM products WHERE id = ?", [id]);
      if (result.affectedRows === 0) {
          return res.status(404).send('Producto no encontrado');
      }
      res.redirect('/products'); // Redirige a la lista de productos después de eliminar
  } catch (err) {
      console.error("Error al eliminar el producto:", err);
      res.status(500).send('Error al eliminar el producto');
  } finally {
      if (conn) conn.release();
  }
});

module.exports = router;