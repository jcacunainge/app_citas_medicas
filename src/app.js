const express = require('express');
const path = require('path');
const mysql = require('mysql');
const myconnetion = require('express-myconnection');
const rutas = require('./routes/appRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');


const app = express();

// Establece la carpeta 'public' como estática para acceder a archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));


// Configurar el análisis de solicitudes para datos codificados en URL y JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Configurar la conexión a la base de datos utilizando variables de entorno
app.use(myconnetion(mysql, {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'app_turnos'
}));


// Establecer la carpeta de vistas y el motor de plantillas EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
      title: 'Página principal',
      message: '¡Hola, mundo!'
    };
    res.render('index', data); // Renderiza 'index.ejs' con los datos proporcionados
});


// Configuración de express-session
app.use(session({
  secret: 'secreto', 
  resave: false,
  saveUninitialized: true
}));


  
// Escucha en un puerto específico
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});



app.use('/', rutas);


