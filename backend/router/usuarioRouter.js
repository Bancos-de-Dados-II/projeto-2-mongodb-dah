import express from 'express';
import { listarDenuncias, criarDenuncia, atualizarDenuncia, deletarDenuncia } from '../controller/usuarioController.js';

const router = express.Router();
const usuarioController = require('../controller/usuarioController');

router.post('/', usuarioController.criarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.patch('/:id', usuarioController.atualizarUsuario);
router.delete('/:id', usuarioController.deletarUsuario);

module.exports = router;