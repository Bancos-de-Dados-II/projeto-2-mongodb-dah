const baseURL = "http://localhost:3000/denuncias"; // Verifique se essa URL está correta

function carregarOcorrencias() {
    fetch(baseURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP! Código: ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            console.log("Dados recebidos:", json); // Debug: Veja os dados no console
            renderizarNaTela(json);
        })
        .catch(err => {
            console.error("Erro ao carregar ocorrências:", err);
            alert("Erro ao carregar as ocorrências. Verifique o console para mais detalhes.");
        });
}

function renderizarNaTela(ocorrencias) {
    const lista = document.getElementById("listaOcorrencias");

    // Limpa a lista antes de adicionar novos itens
    lista.innerHTML = "";

    if (ocorrencias.length === 0) {
        lista.innerHTML = "<p class='text-center text-muted'>Nenhuma ocorrência encontrada.</p>";
        return;
    }

    // Adiciona cada ocorrência como um item da lista
    ocorrencias.forEach(ocorrencia => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<strong>${ocorrencia.titulo}</strong> - ${ocorrencia.descricao} <br> <small>Local: ${ocorrencia.localizacao}</small>`;
        lista.appendChild(li);
    });
}
