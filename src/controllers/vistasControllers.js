// Funciones para renderizar diferentes vistas
function index(req, res) {
    res.render('index');   
}

function registro(req, res) {
    res.render('registro');   
}

function informacionTurnos(req, res) {
    res.render('informacionTurnos');   
}

function perfil(req, res) {
    res.render('perfil');   
}

function tusturnos(req, res) {
    res.render('tusturnos');   
}

function soporte(req, res) {
    res.render('soporte');   
}


module.exports={
    index,
    registro,
    informacionTurnos,
    perfil,
    tusturnos,
    soporte,
}