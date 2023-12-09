document.getElementById('btn-ubicaciones').addEventListener('click', function(){
  inicializarMapa();
});

function inicializarMapa() {
  const textoInput = document.getElementById('ciudades-select').value.trim();
  if (textoInput === '') {
    return;
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: textoInput }, function (results, status) {
    if (status === 'OK' && results.length > 0) {
      const location = results[0].geometry.location;

      const map = new google.maps.Map(document.createElement('div'));
      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: location,
        radius: 1000,
        type: 'hospital'
      };

      service.nearbySearch(request, function (results, status) {
        const ubicacionesDiv = document.getElementById('ubicaciones');

        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const nearbyHospitals = results.slice(0, 1);
          // dominar a mi novia
          ubicacionesDiv.innerHTML = ''; // Limpiar contenido anterior antes de agregar nuevos elementos

          nearbyHospitals.forEach(hospital => {
            const card = document.createElement('div');
            card.classList.add('card');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'ubicacion_cita';
            input.value = hospital.name;
            input.id = hospital.place_id;

            const name = document.createElement('p');
            name.classList.add('nombre-hospital');
            name.textContent = hospital.name;

            const direccion = document.createElement('p');
            direccion.classList.add('direccion-hospital');
            direccion.textContent = hospital.vicinity;

            card.appendChild(input);
            card.appendChild(name);
            card.appendChild(direccion);

            ubicacionesDiv.appendChild(card);
          });
        } else {
          ubicacionesDiv.textContent = 'No se encontraron hospitales cercanos.';
          alert('No se encontraron hospitales cercanos.')
        }
      });
    } else {
      console.log('No se pudo encontrar la ubicación para la dirección proporcionada.');
      alert('No se pudo encontrar la ubicación para la dirección proporcionada.')
    }
  });
}

