const baseURL = "http://localhost:3000"; // Endpoint base do backend

// Função para extrair o parâmetro "id" da URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const ocorrenciaId = getQueryParam("id");

if (!ocorrenciaId) {
  alert("Erro: ID da ocorrência não encontrado.");
  window.location.href = "listaOcorrencia.html";
}

// Função para carregar os dados da ocorrência e preencher o formulário
function carregarOcorrencia() {
  fetch(`${baseURL}/${ocorrenciaId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erro HTTP! Código: ${response.status}`);
      }
      return response.json();
    })
    .then(ocorrencia => {
      // Preenche os campos do formulário com os dados da ocorrência
      document.getElementById("nome").value = ocorrencia.nome || "";
      document.getElementById("descricao").value = ocorrencia.descricao || "";
      if (ocorrencia.dataOcorrencia) {
        // Converte a data para o formato YYYY-MM-DD
        document.getElementById("dataOcorrencia").value = ocorrencia.dataOcorrencia.split("T")[0];
      }
      document.getElementById("horarioOcorrencia").value = ocorrencia.horarioOcorrencia || "";
      
      // Inicializa o mapa com a localização da ocorrência
      if (ocorrencia.localizacao && ocorrencia.localizacao.coordinates) {
        iniciarMapa(ocorrencia.localizacao.coordinates);
      } else {
        // Caso não haja localização, utiliza um valor padrão
        iniciarMapa([-38.545350052293905, -6.8896495335874]);
      }
    })
    .catch(err => {
      console.error("Erro ao carregar ocorrência:", err);
      alert("Erro ao carregar os dados da ocorrência. Veja o console para detalhes.");
    });
}

// Função para inicializar o mapa (apenas exibição, sem edição da localização)
function iniciarMapa(coordenadas) {
  // Para o padrão GeoJSON, coordenadas são [longitude, latitude]
  const [longitude, latitude] = coordenadas;
  const map = L.map("map").setView([latitude, longitude], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  L.marker([latitude, longitude]).addTo(map)
    .bindPopup("Localização da ocorrência")
    .openPopup();
}

// Evento para salvar as alterações
document.getElementById("editForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const dadosAtualizados = {
    nome: document.getElementById("nome").value,
    descricao: document.getElementById("descricao").value,
    dataOcorrencia: document.getElementById("dataOcorrencia").value,
    horarioOcorrencia: document.getElementById("horarioOcorrencia").value,
  };

  fetch(`${baseURL}/${ocorrenciaId}`, {
    method: "PATCH",  // Ou PUT, conforme a sua implementação do backend
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados),
  })
    .then(response => response.json())
    .then(data => {
      alert("Ocorrência atualizada com sucesso!");
      // Redireciona para a página de listagem, por exemplo:
      window.location.href = "listaOcorrencia.html";
    })
    .catch(err => {
      console.error("Erro ao atualizar ocorrência:", err);
      alert("Erro ao salvar as alterações. Veja o console para detalhes.");
    });
});

// Carrega os dados da ocorrência assim que a página é carregada
document.addEventListener("DOMContentLoaded", carregarOcorrencia);
