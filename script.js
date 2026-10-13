// =========================================================
//  CONFIGURACIÓN DEL MAPA
//
//  CENTRO: coordenadas del punto central al abrir la página
//  ZOOM:   3 = ver toda Latinoamérica
//          4 = un poco más cerca
//          5 = ver un país entero
// =========================================================
const CENTRO = [-20, -62];
const ZOOM   = 3;

// ── A partir de acá no toco más nada ───────────────

const mapa = L.map('mapa', { center: CENTRO, zoom: ZOOM });

// Fondo del mapa. Otras opciones gratuitas:
//   Claro:  https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png
//   Oscuro: https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(mapa);

// Panel lateral
const panel           = document.getElementById('panel');
const panelContenido  = document.getElementById('panel-contenido');
const panelBienvenida = document.getElementById('panel-bienvenida');

document.getElementById('panel-cerrar').addEventListener('click', function() {
  panel.classList.remove('abierto');
});

function crearIcono(visto) {
  return L.divIcon({
    className: '',
    html: '<div class="marcador' + (visto ? ' visto' : '') + '"></div>',
    iconAnchor: [8, 8]
  });
}

// Lee cada <article class="lugar"> y crea su marcador en el mapa
document.querySelectorAll('.lugar').forEach(function(articulo) {
  var lat    = articulo.dataset.lat;
  var lng    = articulo.dataset.lng;
  var titulo = articulo.dataset.titulo;
  var fecha  = articulo.dataset.fecha;
  var foto   = articulo.dataset.foto;
  var texto  = articulo.innerHTML;

  var marcador = L.marker([lat, lng], { icon: crearIcono(false) }).addTo(mapa);

  marcador.on('click', function() {
    var contenido = '<h2>' + titulo + '</h2>';
    if (fecha) contenido += '<p class="fecha">' + fecha + '</p>';
    if (foto)  contenido += '<img src="' + foto + '" alt="' + titulo + '" class="foto" />';
    contenido += '<div class="historia">' + texto + '</div>';

    panelContenido.innerHTML = contenido;
    panelBienvenida.style.display = 'none';
    panel.classList.add('abierto');
    marcador.setIcon(crearIcono(true));
  });
});
