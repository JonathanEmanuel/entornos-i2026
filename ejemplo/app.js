// const map = L.map('map').setView([-34.6037, -58.3816], 15);
/*
const map = L.map('map').setView([0, 0], 15);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const marker = L.marker([-34.6037, -58.3816]).addTo(map);
marker.bindPopup("Estoy en Buenos Aires").openPopup();
*/
const btnUbicacion = document.getElementById("btnUbicacion");
const estado = document.getElementById("estado");
const latitud = document.getElementById("latitud");
const longitud = document.getElementById("longitud");

const map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker = null;

btnUbicacion.addEventListener("click", () => {
  if (!navigator.geolocation) {
    estado.textContent = "La geolocalización no está disponible en este navegador.";
    return;
  }

  estado.textContent = "Cargando ubicación...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      latitud.textContent = lat;
      longitud.textContent = lon;
      estado.textContent = "Ubicación obtenida correctamente.";

      map.setView([lat, lon], 15);

      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([lat, lon]).addTo(map);
      marker.bindPopup("Estás aquí").openPopup();
    },
    (error) => {
      estado.textContent = "No se pudo obtener la ubicación: " + error.message;
    }
  );
});