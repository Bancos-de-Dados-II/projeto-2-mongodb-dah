import express from 'express';
import cors from 'cors';
import { getUsuarios } from './testarConexao.js';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/usuario', async (req, res)=>{
    try{
        const resposta = await getUsuarios();
        return res.status(200).json(resposta);
    }
    catch(erro){
        res.status(500).json({error: "Could not contact server database"});
    }
});

const porta = 3000;
app.listen(porta, () =>{
    console.log(`Aplicação rodando na porta ${porta}`);
});
