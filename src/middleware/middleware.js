
// Middleware para verificar si el usuario ha iniciado sesión
function loginRequerido(req, res, next) {
    if (req.session && req.session.userID) {
        // Si el usuario ha iniciado sesión, permitir el acceso a la ruta
        return next();
    } else {
        // Si el usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
        res.redirect('/index'); 
    }
}

// Función para cerrar sesión de usuario
function cerrarSesion(req, res) {
    try {
        // Destruir la sesión
        req.session.destroy((err) => {
            if (err) {
                console.error('Error al cerrar sesión:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Redirigir al usuario a la página de inicio de sesión u otra página deseada después de cerrar sesión
            res.redirect('/index'); 
        });
    } catch (error) {
        console.error('Ha ocurrido un error al intentar cerrar sesión:', error);
        res.status(500).send('Ha ocurrido un error al intentar cerrar sesión');
    }
}

module.exports = {
    loginRequerido,
    cerrarSesion,
}