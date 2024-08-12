const express = require('express');
const router = express.Router();
const db = require('../repository/repo'); 

console.log(db);

router.get('/', async (req, res) => {
  try {
      const products = await db.findAll(); // Llama a la función findAll de repo.js
      res.render('products/index', { title: 'Minventario', products }); 
  } catch (err) {
      console.error('Error al obtener productos:', err); // Imprime el error para depuración
      res.status(500).send('Error al obtener productos'); // Devuelve un mensaje de error al usuario
  }
});

console.log(db); // Esto debería mostrar { findAll: [Function: findAll], findById: [Function: findById] }

module.exports = router; 

