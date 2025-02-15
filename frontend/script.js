let map;
let marker = null; // Para armazenar o marcador

// Inicializa o mapa
function initMap() {
  const center = [-6.888463202449027, -38.558930105104125]; // Coordenadas iniciais
  map = L.map('map').setView(center, 14);

  // Adiciona a camada do OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
}

// Função para liberar o pin e permitir que o usuário posicione no mapa
function liberarPin() {
  if (!map) {
    console.error("Erro: O mapa ainda não foi carregado.");
    return;
  }

  if (!marker) {
    // Obtém o centro do mapa como posição inicial
    const center = map.getCenter();

    // Cria o marcador e permite arrastar
    marker = L.marker(center, { draggable: true }).addTo(map);

    // Exibe um alerta confirmando que o usuário pode mover o pin
    alert("Agora você pode posicionar o pin no local da ocorrência!");

    // Captura a nova posição quando o marcador for movido
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      console.log("Nova posição:", position.lat, position.lng);
    });
  } else {
    alert("O pin já está liberado!");
  }
}

// Função para coletar os valores do formulário
function getValuesField() {
  if (!marker) {
    alert("Por favor, adicione um marcador no mapa antes de salvar a ocorrência.");
    return null;
  }

  const latLng = marker.getLatLng();
  return {
    titulo: document.getElementById("titulo").value,
    tipo: document.getElementById("tipo").value,
    data: document.getElementById("data").value,
    hora: document.getElementById("hora").value,
    geometria: {
      type: "Point",
      coordinates: [latLng.lng, latLng.lat], // Formato GeoJSON correto
    },
  };
}

async function fetchDenuncia() {
  try {
    const response = await fetch("http://localhost:3000/denuncia", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
}

// Função para salvar a ocorrência e liberar o pin
function salvar() {
  const obj = getValuesField();

  if (!obj) return;

  fetch("http://localhost:3000/ocorrencia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then(response => {
      if (response.ok) {
        alert("Ocorrência salva com sucesso!");
      } else {
        alert("Falha ao salvar a ocorrência!");
      }
    })
    .catch(error => {
      console.error("Erro ao salvar:", error);
      alert("Erro ao conectar ao servidor!");
    });
}

// Espera o DOM carregar antes de inicializar o mapa
document.addEventListener("DOMContentLoaded", initMap);
