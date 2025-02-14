import express from 'express';
import cors from 'cors';
import denunciaRouter from './router/denunciaRouter.js';
import usuarioRouter from './router/usuarioRouter.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/denuncias', denunciaRouter);
app.use('/usuarios', usuarioRouter);

app.listen(3000, () =>{
    console.log('Aplicação rodando na porta 3000');
});