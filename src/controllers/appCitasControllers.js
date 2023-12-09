async function informacionCita(req, res) {
    try {
        const { hora_cita, fecha_cita, tipo_cita, ubicacion_cita } = req.body;
        const userID = req.session.userID; // Obtener el ID del usuario desde la sesión

        // Consulta para verificar si el usuario ya tiene una cita
        const queryVerificarCita = 'SELECT * FROM cita WHERE id = ?';

        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }

            conn.query(queryVerificarCita, [userID], async (err, existingCitas) => {
                if (existingCitas.length > 0) {
                    // Si el usuario ya tiene una cita, almacenarla en la sesión
                    const userCita = existingCitas[0]; // Suponiendo que solo puede tener una cita
                    req.session.userCita = userCita;
                    console.log('Cita encontrada en la base de datos:', req.session.userCita);
                    res.render('tusturnos', { userCita });
                } else {
                    // Si el usuario no tiene una cita, guardar la nueva cita en la base de datos
                    const queryGuardarInformacion = 'INSERT INTO cita(hora_cita, fecha_cita, tipo_cita, ubicacion_cita, id) VALUES (?, ?, ?, ?, ?)';
                    conn.query(queryGuardarInformacion, [hora_cita, fecha_cita, tipo_cita, ubicacion_cita, userID], (err, result) => {
                        if (err) {
                            throw err;
                        }
                        const userCita = {
                            hora_cita,
                            fecha_cita,
                            tipo_cita,
                            ubicacion_cita
                        };

                        req.session.userCita = userCita;
                        console.log('Cita guardada en la sesión:', req.session.userCita);
                        res.render('tusturnos', { userCita });
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error al registrar la cita");
    }
}

async function mostrarCitas(req, res) {
    try {
        const userID = req.session.userID; // Obtener el ID del usuario desde la sesión

        // Consulta para recuperar la cita del usuario desde la base de datos
        const queryRecuperarCita = 'SELECT * FROM cita WHERE id = ?';

        req.getConnection((err, conn) => {
            if (err) {
                throw err;
            }

            conn.query(queryRecuperarCita, [userID], async (err, userCita) => {
                if (err) {
                    throw err;
                }

                if (userCita && userCita.length > 0) {
                    // Si se encuentra la cita en la base de datos, renderizar la página con los datos de la cita
                    console.log('Datos de la cita encontrados en la base de datos:', userCita);
                    res.render('tusturnos', { userCita: userCita[0] }); // Suponiendo que solo hay una cita por usuario
                } else {
                    res.status(404).send("No se encontraron datos de la cita para este usuario");
                }
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error al mostrar la cita");
    }
}


module.exports = {
    informacionCita,
    mostrarCitas,

}