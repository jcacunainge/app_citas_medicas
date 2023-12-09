let datosPreguntas = [
  {
    "id": 1,
    "pregunta": "¿Cómo puedo registrarme para obtener una cita médica?",
    "respuesta": "Para registrarte, ve a la sección 'Registrarse', completa el formulario y selecciona 'Agendar Cita Médica'."
  },
  {
    "id": 2,
    "pregunta": "¿Puedo cancelar una cita médica que ya he reservado?",
    "respuesta": "Sí, puedes cancelar tu cita médica. Dirígete a la sección 'Mis Citas' para cancelar, sujeto a las políticas de cancelación."
  },
  {
    "id": 3,
    "pregunta": "¿Cuál es el horario de atención para solicitar citas médicas?",
    "respuesta": "Puedes solicitar citas médicas las 24 horas, sin embargo, te recomendamos consultar los horarios específicos de atención en nuestra sección de contacto."
  },
  {
    "id": 4,
    "pregunta": "¿Qué documentos debo llevar conmigo a la cita médica?",
    "respuesta": "Es importante llevar tu documento de identidad y cualquier documento adicional que se requiera para la cita programada."
  },
  {
    "id": 5,
    "pregunta": "¿Puedo cambiar la fecha u hora de una cita médica ya reservada?",
    "respuesta": "Sí, puedes modificar la fecha u hora de tu cita médica desde la sección 'Mis Citas', sujeto a la disponibilidad de horarios."
  },
  {
    "id": 6,
    "pregunta": "¿Cómo puedo ver el historial de todas las citas médicas que he reservado?",
    "respuesta": "En la sección 'Historial de Citas' encontrarás un registro completo de todas las citas médicas que has reservado."
  },
  {
    "id": 7,
    "pregunta": "¿Ofrecen notificaciones por correo electrónico o mensajes de texto para recordar las citas médicas programadas?",
    "respuesta": "Sí, enviamos recordatorios por correo electrónico o mensajes de texto para recordar las citas médicas programadas."
  },
  {
    "id": 8,
    "pregunta": "¿Qué debo hacer si llego tarde a mi cita médica programada?",
    "respuesta": "Si llegas tarde, te recomendamos contactarnos para verificar si es posible reprogramar la cita o si hay disponibilidad para atenderte."
  },
  {
    "id": 9,
    "pregunta": "¿Puedo reservar citas médicas para familiares o amigos a través de mi cuenta?",
    "respuesta": "Verifica si nuestra aplicación permite reservar citas para otros utilizando tu cuenta."
  },
  {
    "id": 10,
    "pregunta": "¿Qué debo hacer si no encuentro disponibilidad de citas en la fecha deseada?",
    "respuesta": "Te recomendamos revisar periódicamente la disponibilidad de citas o contactarnos para recibir asistencia."
  },
  {
    "id": 11,
    "pregunta": "¿Ofrecen algún tipo de lista de espera para citas no disponibles?",
    "respuesta": "Sí, puedes agregar tu nombre a nuestra lista de espera para citas no disponibles."
  },
  {
    "id": 12,
    "pregunta": "¿La aplicación permite reprogramar automáticamente las citas canceladas?",
    "respuesta": "Dependiendo de la configuración, algunas citas canceladas pueden ser reprogramadas automáticamente. Consulta la sección de ayuda o soporte técnico."
  },
  {
    "id": 13,
    "pregunta": "¿Con cuánta anticipación debo reservar una cita médica?",
    "respuesta": "Te recomendamos reservar con anticipación, aunque la disponibilidad puede variar según la demanda."
  },
  {
    "id": 14,
    "pregunta": "¿Recibiré confirmaciones inmediatas luego de reservar una cita médica?",
    "respuesta": "Sí, recibirás confirmaciones inmediatas a través de la aplicación o por correo electrónico después de reservar tu cita médica."
  },
  {
    "id": 15,
    "pregunta": "¿Se pueden realizar pagos a través de la aplicación para servicios relacionados con las citas médicas?",
    "respuesta": "Verifica la opción de pago durante el proceso de reserva para saber si es posible realizar pagos a través de la aplicación."
  },
  {
    "id": 16,
    "pregunta": "¿Qué medidas de seguridad se toman para proteger la privacidad de la información al reservar una cita médica?",
    "respuesta": "Implementamos medidas de encriptación y seguimos estrictas políticas de privacidad para proteger tu información personal durante el proceso de reserva."
  },
  {
    "id": 17,
    "pregunta": "¿Se pueden solicitar citas para múltiples servicios médicos en una sola reserva?",
    "respuesta": "Algunas aplicaciones permiten solicitar múltiples servicios médicos en una única cita, verifica si nuestra aplicación ofrece esta opción."
  },
  {
    "id": 18,
    "pregunta": "¿Qué hago si tengo una emergencia y necesito una cita médica con urgencia?",
    "respuesta": "En caso de emergencia médica, comunícate directamente con nuestro centro médico o acude al servicio de emergencias más cercano. Contamos con protocolos especiales para emergencias."
  },
  {
    "id": 19,
    "pregunta": "¿Existe algún sistema de reseñas o calificaciones para evaluar la atención médica luego de la cita?",
    "respuesta": "Sí, nuestra aplicación cuenta con un sistema de reseñas y calificaciones para que puedas evaluar la atención médica recibida después de cada cita."
  },
  {
    "id": 20,
    "pregunta": "¿Ofrecen servicios de telemedicina o consultas en línea a través de la aplicación?",
    "respuesta": "Verifica si nuestra aplicación ofrece servicios de telemedicina o consultas médicas en línea para atender ciertos casos a distancia."
  }
];
const preguntasPorPagina = 2;
let paginaActual = 1;

function mostrarPreguntas() {
  const listaPreguntas = document.querySelector('#container-preguntas');
  listaPreguntas.innerHTML = '';

  const inicio = (paginaActual - 1) * preguntasPorPagina;
  const fin = inicio + preguntasPorPagina;
  const preguntasPagina = datosPreguntas.slice(inicio, fin);

  preguntasPagina.forEach(function (pregunta) {
    let variablePregunta = crearCardPregunta(pregunta);
    listaPreguntas.appendChild(variablePregunta);
  });
}

function crearCardPregunta(pregunta) {
  let itemsPregunta = document.createElement('div');
  itemsPregunta.innerHTML = `
    <div class="card">
      <div class="card-icon">
        <p>${pregunta.pregunta}</p>
      </div>
      <span class="card-body">
        ${pregunta.respuesta}
      </span>
    </div>
  `;
  return itemsPregunta;
}

function cambiarPagina(direccion) {
  if (direccion === 'anterior' && paginaActual > 1) {
    paginaActual--;
  } else if (direccion === 'siguiente' && paginaActual < Math.ceil(datosPreguntas.length / preguntasPorPagina)) {
    paginaActual++;
  }
  mostrarPreguntas();
}

document.getElementById('anterior').addEventListener('click', function () {
  cambiarPagina('anterior');
});

document.getElementById('siguiente').addEventListener('click', function () {
  cambiarPagina('siguiente');
});

// Mostrar las preguntas de la primera página al cargar
mostrarPreguntas();