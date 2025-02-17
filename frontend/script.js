// script.js

let map;
let marker = null;

function initMap() {
    const center = [-6.888463202449027, -38.558930105104125];
    map = L.map('map').setView(center, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', (e) => {
        addMarker(e.latlng);
    });
}

function addMarker(latLng) {
    if (marker) {
        marker.setLatLng(latLng);
    } else {
        marker = L.marker(latLng, { draggable: true }).addTo(map);

        marker.on('dragend', () => {
            console.log("Nova posição:", marker.getLatLng());
        });
    }
}


function getValuesField() {
    if (!marker) {
        alert("Por favor, defina a localização da ocorrência no mapa.");
        return null;
    }

    const latLng = marker.getLatLng();
    return {
        titulo: document.getElementById("titulo").value,
        tipo: document.getElementById("tipo").value,
        data: document.getElementById("data").value,
        hora: document.getElementById("hora").value,
        localizacao: {
            type: "Point",
            coordinates: [latLng.lng, latLng.lat],
        },
    };
}

function salvar() {
    const obj = getValuesField();

    if (!obj) return;

    fetch("http://localhost:3000/denuncias", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    })
        .then(response => {
            if (response.ok) {
                alert("Ocorrência salva com sucesso!");
                document.getElementById("ocorrenciaForm").reset(); // Limpa o formulário
                if (marker) { // Verifica se o marcador existe antes de removê-lo
                    map.removeLayer(marker);
                    marker = null;
                }
            } else {
                alert("Falha ao salvar a ocorrência!");
            }
        })
        .catch(error => {
            console.error("Erro ao salvar:", error);
            alert("Erro ao conectar ao servidor!");
        });
}


document.addEventListener("DOMContentLoaded", initMap);