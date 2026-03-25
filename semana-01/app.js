const pre = document.querySelector('#pre');
const btnGeo = document.querySelector('#btn-geo');



if( !navigator.geolocation){
    pre.innerText = 'El navegador No soporta la API de Geolocalización'
}

let map = null;

const inicializarMapa = () => {
  map = L.map("map").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
}


const geoSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    console.log({latitude, longitude})
    pre.innerText = `Latidud ${latitude}  Longitud ${longitude}`;

      map.setView([latitude, longitude], 15);

}

const geoError= (err) => {
    switch (err.code) {
    case err.PERMISSION_DENIED:
        pre.innerText = 'Permiso denegado'
        console.log('Permiso denegado');
        break;
    case err.POSITION_UNAVAILABLE:
        pre.innerText = 'Ubicación no disponible'
        console.log('Ubicación no disponible');
        break;
    case err.TIMEOUT:
        pre.innerText = 'Tiempo de espera agotado'
        console.log('Tiempo de espera agotado');
        break;
  }

}
btnGeo.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
})

inicializarMapa();