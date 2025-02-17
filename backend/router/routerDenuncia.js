import { Router } from 'express';	
import { teste, criarDenuncia, deletarDenuncia, buscarDenuncia, atualizarDenuncia } from '../controller/denunciaController.js';

const denunciaRouter = Router();

denunciaRouter.get('/teste', teste);
denunciaRouter.get('/:id', buscarDenuncia);
denunciaRouter.post('/', criarDenuncia);
denunciaRouter.delete('/:id', deletarDenuncia);
denunciaRouter.patch('/:id', atualizarDenuncia);

export default denunciaRouter;
