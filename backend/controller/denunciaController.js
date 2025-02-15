import Denuncia from "../model/denuncia.js";

export async function listarDenuncias(req, res){
    const cache = await client.get('denuncias');
    if(!cache){
        const denuncia = await Denuncia.findAll();
        await client.set('denuncias', 
            JSON.stringify(denuncia), {'EX': 3600});
        res.json(denuncia);
        console.log('Retornando do postgre');
        return;
    }
    console.log('Retornando do redis');
    res.json(JSON.parse(cache));
}

export async function criarDenuncia(req, res){
    try{
        const denuncias = await Denuncia.create(req.body);
        res.json(denuncia);
    }catch(err){
        res.status(400).send(err.errors[0].message);
    }
}

export async function deletarDenuncia(req, res){
    const denuncia = await Denuncia.findByPk(req.params.id);
    if(!denuncia){
        res.status(404).send("Denuncia não encontrada");
        return;
    }
    await denuncia.destroy();
    res.json(denuncia);
}

export async function buscarDenuncia(req, res){
    const denuncia = await Denuncia.findByPk(req.params.id);
    if(!denuncia){
        res.status(404).send("Denuncia não encontrada");
        return;
    }
    res.json(denuncia);
}

export async function atualizarDenuncia(req, res){
    try{
        const denuncia = await Denuncia.findByPk(req.params.id);
        if(!denuncia){
            res.status(404).send("Denuncia não encontrada");
            return;
        }
        denuncia.set(req.body);
        await denuncia.save();
        res.json(denuncia);
    }catch(err){
        res.status(400).send(err.errors[0].message);
    }
}