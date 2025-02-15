import express from 'express';
import { salvarRascunho, recuperarRascunho } from '../controller/rascunhoControle.js';

const routerRascunho = express.Router();

routerRascunho.route('/ocorrencia/rascunho')
  .post(salvarRascunho)
  .get(recuperarRascunho);

export default routerRascunho;
