const express = require('express');
const router = express.Router();
const productModel = require('../models/product');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const products = await productModel.findAll();
        res.render('index', { products });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para obtener un producto por ID
router.get('/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (product) {
            res.render('product-detail', { product });
        } else {
            res.status(404).send('Producto no encontrado');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para crear un nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        };
        const productId = await productModel.create(newProduct);
        res.redirect(`/products/${productId}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para actualizar un producto
router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        };
        await productModel.update(req.params.id, updatedProduct);
        res.redirect(`/products/${req.params.id}`);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ruta para eliminar un producto
router.delete('/:id', async (req, res) => {
    try {
        await productModel.delete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;



/*

const express = require('express'); //importar express
const router  = express.Router(); // enrutador 
//const db = require('../db'); //importa la configuracion de la base de datos 
var db = require("../repository/repo");

//Obtener todos los productos
router.get('/', (req, res) => {
    db.query('select*from products', (err, results) => {
        if (err) throw err; //Manejo de errores
        res.render('products/index', {products: results }); //Renderiza la vista de productos 
    });
}); 

// Formulario para crear un nuevo producto 
router.get('/new', (req, res) =>{
    res.render('products/new'); //Renderiza la vista para crear un nuevo producto
});

// Crear un nuevo producto
router.post('/', (req, res) => {
    const {name, description, price, quantity } = req.body; // Datos del formulario
    const query = 'insert into products (name, description, price, quantity) values (?, ?, ?, ?)';
    db.query(query, [name, description, price, quantity], (err, result) => {
        if (err) throw err; // Manejo de errores 
        res.redirect('/products'); //Redirige a la lista de productos 
    });
});

//Formulario para editar un producto
router.get('/:id/edit', (req, res) =>{
    const { id } = req.params; // id del producto
    db.query('select*from products where id = ?', [id], (err, result) => {
        if (err) throw err; //Manejo de errores
        if (result.length === 0) return res.status(404).send ('Producto no encontrado'); //Manejo de errores
        res.render('products/edit', {product: result[0]}); //Renderiza la vista el producto
    });
}); 

// Actualizar un producto 
router.post('/:id', (req, res) => {
    const { id } = req.params; //id del producto
    const {name, description, price, quantity} = req.body; //Datos del formulario
    const query = 'update products set name = ?, description = ?, quantity = ? where id = ?'; 
    db.query(query, [name, description, price, quantity, id], (err, result) => {
        if (err) throw err; //Manejo de errores
        res.redirect('/products'); //Redirige a la lista de productos
    });
});

//Eliminar un producto 

router.post('/:id/delete', (req, res) => {
    const { id } = req.params; //id del producto
    db.query('delete from products where id = ?', [id], (err, result) => {
        if (err) throw err; // Manejo de errores 
        res.redirect('/products'); //Redirige a la lista de productos
    });
});

module.exports = router; //Exporta el enrutadorrr

*/