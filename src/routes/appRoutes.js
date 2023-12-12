const express = require('express');
const appControllers = require('../controllers/appUsuarioControllers');
const appVistas = require('../controllers/vistasControllers');
const appCitasControllers = require('../controllers/appCitasControllers');
const middleware = require('../middleware/middleware');

const router = express.Router();

//Rutas app navegación
router.get('/index', appVistas.index);
router.get('/registro', appVistas.registro);
router.get('/perfil', middleware.loginRequerido, appVistas.perfil); 
router.get('/tusturnos', middleware.loginRequerido, appCitasControllers.informacionCita, appVistas.tusturnos);
router.get('/informacionTurnos', middleware.loginRequerido, appVistas.informacionTurnos); 
router.get('/soporte', middleware.loginRequerido, appVistas.soporte); 
router.get('/medicos', middleware.loginRequerido, appVistas.soporte); 

// App rutas middleware
router.get('/cerrarSesion', middleware.loginRequerido, middleware.cerrarSesion)

//rutas app User Controllers
router.post('/registrarUsuario', appControllers.registrarUsuario); 
router.post('/loginUsuario', appControllers.loginUsuario); 
router.get('/editarUsuario', middleware.loginRequerido, appControllers.obtenerDatosUsuarioPorID); 
router.post('/actualizarInformacion', middleware.loginRequerido, appControllers.actualizarInformacion); 

//rutas citas
router.post('/informacionCita', middleware.loginRequerido, appCitasControllers.informacionCita)
router.get('/mostrarCitas', middleware.loginRequerido, appCitasControllers.mostrarCitas)

module.exports = router;  