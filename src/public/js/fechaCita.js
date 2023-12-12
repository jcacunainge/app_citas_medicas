function generarFechas() {
  var select = document.getElementById("fecha");

  // Obtiene la fecha actual
  var fechaActual = new Date();

  // Agrega las siguientes cuatro fechas a partir de la fecha actual (evitando sábado y domingo)
  for (var i = 0; i < 5;) {
    // Verifica si la fecha actual es sábado (6) o domingo (0)
    if (fechaActual.getDay() !== 6 && fechaActual.getDay() !== 0) {
      var opcion = document.createElement("option");
      opcion.value = fechaActual.toISOString().slice(0, 10); // Formato de fecha YYYY-MM-DD
      opcion.textContent = formatearFecha(fechaActual);
      select.appendChild(opcion);
      i++; // Incrementa solo si se agrega una fecha válida
    }

    // Incrementa la fecha actual en un día
    fechaActual.setDate(fechaActual.getDate() + 1);
  }
}


// Función para dar formato a la fecha (solo año, mes y día)
function formatearFecha(fecha) {
  var opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return fecha.toLocaleDateString('es-ES', opciones);
}


// Genera las fechas al cargar la página
window.onload = function() {
  generarFechas();
}
