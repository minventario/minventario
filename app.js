var createError = require('http-errors'); //Manejo de errores HTTP
var express = require('express'); //Framework de servidor web
var path = require('path'); //Modulo para manejar rutas de archivos 
var cookieParser = require('cookie-parser'); //Middleware para analizar cookies
var logger = require('morgan');//Milddleware para registrar solicitudes HTTP 
var session = require('express-session'); //Middleware para manejar sesiones

const app = express();

//Rutas de la aplicacion 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

// app.use('/products', productsRouter);



/* var app = express(); //instacia de la aplicacion Express
const PORT = process.env.PORT || 3001; */

// Configuracion del motor de vistas 
app.set('views', path.join(__dirname, 'views')); // Directorio de vistas
app.set('view engine', 'ejs'); //Motor de vistas EJS 

// Configuracion de middlewares 
app.use(logger('dev')); //Registro de solicitudes 
app.use(express.json()); //Paseo de JSON
app.use(express.urlencoded({ extended: false })); //Parseo de datos de formulario 
app.use(cookieParser()); //Manejo den cookies 
app.use(express.static(path.join(__dirname, 'public'))); // Archivos estaticos 

//Configuracion de sesiones 
app.use(session({
  secret: 'minventario', 
  resave: false, //No guardar sesion si no se modifica 
  saveUninitialized: true, //Guardar sesion aunque no se inicialice  
  cookie: {secure: false} //cookie no asegura (cambiar a true si usar HTTPS )
}));

//Rutas
app.use('/', indexRouter); // Ruta principal 
app.use('/users', usersRouter); //Ruta de usuarios 
app.use('/products', productsRouter); // Ruta de productos (CRUD)


// catch 404 and forward to error handler
app.use(function(req, res, next) { //Crear error 404 y pasar al siguente middleware
  next(createError(404));
});

/* // Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://db:${PORT}`);
}); */

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message; //Mensaje de error 
  res.locasls.error = req.app.get('env') === 'development' ? err : {}; //Mostrar error en desarrollo 

  // render the error page
  res.status(err.status || 500); // Estado del error 
  res.render('error'); // Renderizar la vista de error
});


module.exports = app; //Exportar la acpliacacion para ser usada por el servidor 
