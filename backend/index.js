import express from 'express';
import cors from 'cors';
// import denunciaRouter from './router/routerDenuncia.js';
import routesDenuncia from "./router/routerDenuncia.js"

// Se desejar incluir também o rascunho:
// import routerRascunho from './router/routerRascunho.js';

const app = express();
app.use(express.json());
app.use(cors());

// app.use('/denuncias', denunciaRouter);
// app.use('/rascunho', routerRascunho); // se necessário
app.use(routesDenuncia);

app.listen(3000, () => {
  console.log('Aplicação rodando na porta 3000');
});

/*
{
  "nome": "Denúncia de Poluição",
  "localizacao": {
    "type": "Point",
    "coordinates": [-46.633308, -23.55052]
  },
  "descricao": "Grande quantidade de lixo descartado irregularmente próximo ao rio.",
  "status": "Aberta"
}
*/