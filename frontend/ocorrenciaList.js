const baseURL = "http://localhost:3000/denuncias"; 

function carregarOcorrencias() {
    fetch(baseURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Código: ${response.status}`);
            }
            return response.json();
        })
        .then(ocorrencias => {
            console.log("Dados recebidos:", ocorrencias);
            renderizarNaTela(ocorrencias);
        })
        .catch(err => {
            console.error("Erro ao carregar ocorrências:", err);
            alert("Erro ao carregar as ocorrências. Verifique o console para mais detalhes.");
        });
}

function renderizarNaTela(ocorrencias) {
    const lista = document.getElementById("listaOcorrencias");

    lista.innerHTML = ""; 

    if (ocorrencias.length === 0) {
        lista.innerHTML = "<p class='text-center text-muted'>Nenhuma ocorrência encontrada.</p>";
        return;
    }

    ocorrencias.forEach(ocorrencia => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "align-items-start"); 

        // Div para o mapa
        const mapDiv = document.createElement("div");
        mapDiv.id = `map-${ocorrencia._id}`; 
        mapDiv.classList.add("map-container"); 
        li.appendChild(mapDiv);

        // Div para os detalhes da ocorrência
        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details", "ms-3"); 
        detailsDiv.innerHTML = `
            <strong>${ocorrencia.titulo}</strong> - ${ocorrencia.descricao} <br>
            <small>Data: ${formatarData(ocorrencia.data)} | Hora: ${ocorrencia.hora}</small> <br>
            <small>Local: ${ocorrencia.localizacao.coordinates[1]}, ${ocorrencia.localizacao.coordinates[0]}</small>
        `;
        li.appendChild(detailsDiv);

        lista.appendChild(li);

        // Inicializa o mapa usando Leaflet
        const map = L.map(mapDiv.id).setView(
            [ocorrencia.localizacao.coordinates[1], ocorrencia.localizacao.coordinates[0]],
            13
        );

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);
    });
}

function formatarData(dataString) {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

// Chame a função para carregar as ocorrências quando a página carregar
window.addEventListener('DOMContentLoaded', carregarOcorrencias);