var express = require('express');
var router = express.Router();
var db = require("../repository/repo")



/* GET home page. */
router.get('/', async function(req, res, next) {
  let results = await db.findAll()
  console.log({ title: 'Minventario', results });
  res.render('index', { title: 'Minventario', results });
}); 

router.get('/', async (req, res) => {
  try {
      const products = await db.findAll(); // Asegúrate de que esta función devuelve datos
      res.render('index', { products }); // Pasa 'products' a la vista
  } catch (err) {
      console.error('Error al obtener productos:', err);
      res.status(500).send('Error en la base de datos');
  }
});

router.get('/home', async function(req, res, next) {
  let results = await db.findAll()
  console.log({ title: 'Express', results });
  res.render('home', { title: 'home', results });
});


module.exports = router;

