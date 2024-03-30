//Mapa centrado en Galicia
var map = L.map('map').setView([43, -8], 8);


//Funcion para xerar a capa do mapa segundo as cordeadas de "map"
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);