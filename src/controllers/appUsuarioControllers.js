// Importar bcrypt para el hash de contraseñas
const bcrypt = require('bcrypt');


// Función para iniciar sesión de usuarios
async function loginUsuario(req, res) {
    try {
        const { correo, contraseña } = req.body;

        // Conexión a la base de datos
        req.getConnection((err, conn) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Consulta para obtener la información del usuario por correo
            conn.query('SELECT * FROM informacion_user WHERE correo = ?', [correo], async (err, userdata) => {
                if (err) {
                    console.error('Error querying database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                // Si no se encuentra ningún usuario con el correo proporcionado, se redirige al index con un mensaje de error
                if (userdata.length === 0) {
                    return res.render('index', { error: 'Correo no registrado' });
                }

                const informacion_user = userdata[0];

                // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos usando bcrypt
                const match = await bcrypt.compare(contraseña, informacion_user.contraseña);
                if (match) {

                    // Guardar el ID del usuario en la sesión
                    req.session.userID = informacion_user.id; // 'id' es el campo que almacena el ID del usuario en la tabla
                    console.log('Inicio de sesión exitoso');
                    res.redirect('/informacionTurnos');
                } else {
                    console.log('Contraseña incorrecta');
                    return res.render('index', { error: 'Contraseña incorrecta' });
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Ha ocurrido un error al intentar iniciar sesión');
    }
}

// Función para registrar un nuevo usuario
async function registrarUsuario(req, res) {
    try {
        const { nombre_apellido, numero_documento, correo, telefono, contraseña, confirmarContraseña } = req.body;

        // Verifica si las contraseñas coinciden, si no coinciden devuelve un error
        if (contraseña !== confirmarContraseña) {
            return res.status(400).send("Las contraseñas no coinciden");
        }

        // Hashea la contraseña utilizando bcrypt antes de guardarla en la base de datos
        const hashedContraseña = await bcrypt.hash(contraseña, 10);
        const queryGuardarInformacion = 'INSERT INTO informacion_user(nombre_apellido, numero_documento, correo, telefono, contraseña) VALUES (?, ?, ?, ?, ?)';
        
        // Conexión a la base de datos para verificar si el correo ya está registrado
        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            
            conn.query('SELECT * FROM informacion_user WHERE correo = ?', [correo], async (err, existingUser) => {
                if (existingUser.length > 0) {
                    return res.status(400).send("El correo ya está registrado");
                } else {
                    // Inserta la información del nuevo usuario en la base de datos
                    conn.query(queryGuardarInformacion, [nombre_apellido, numero_documento, correo, telefono, hashedContraseña], (err, result) => {
                        if (err) {
                            throw err;
                        }
                        res.redirect('/index');
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error al registrar el usuario");
    }
}

async function obtenerDatosUsuarioPorID(req, res) {
    try {
        // Obtener el ID del usuario desde la sesión (asumiendo que se guardó después de la autenticación)
        const idUsuario = req.session.userID;

        if (!idUsuario) {
            // Si no hay ID de usuario en la sesión, devuelve un error 401 (No autorizado)
            return res.status(401).send('Usuario no autenticado');
        }

        // Intenta conectar con la base de datos usando req.getConnection
        req.getConnection((err, conn) => {
            if (err) {
                // Si hay un error al conectar con la base de datos, muestra un mensaje de error y devuelve un error 500 (Error interno del servidor)
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Realiza una consulta a la base de datos para obtener la información del usuario por su ID
            conn.query('SELECT * FROM informacion_user WHERE id = ?', [idUsuario], async (err, results) => {
                if (err) {
                    // Si hay un error al ejecutar la consulta, muestra un mensaje de error y devuelve un error 500
                    console.error('Error querying database:', err);
                    return res.status(500).send('Internal Server Error');
                }

                if (results.length === 0) {
                    // Si no se encontró ningún usuario con el ID proporcionado, devuelve un error 404 (No encontrado)
                    return res.status(404).send('Usuario no encontrado');
                } else {
                    // Si se encontró el usuario, renderiza la vista 'editarUsuario' con la información del primer resultado
                    res.render('editarUsuario', { user: results[0] });
                }
            });
        });
    } catch (error) {
        // Captura cualquier error inesperado y muestra un mensaje de error 500 (Error interno del servidor)
        console.error(error);
        res.status(500).send('Ha ocurrido un error al obtener los datos del usuario');
    }
}

async function actualizarInformacion(req, res) {
    try {
        const { nombre_apellido, numero_documento, correo, telefono } = req.body;

        const queryActualizarInformacion = 'UPDATE informacion_user SET nombre_apellido=?, numero_documento=?, telefono=? WHERE correo=?';

        // Conexión a la base de datos para actualizar la información del usuario
        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }

            conn.query(queryActualizarInformacion, [nombre_apellido, numero_documento, telefono, correo], (err, result) => {
                if (err) {
                    throw err;
                }
                // res.status(200).send("Información del usuario actualizada correctamente");
                res.render('perfil')
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error al actualizar la información del usuario");
    }
}


module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerDatosUsuarioPorID,
    actualizarInformacion,
};









