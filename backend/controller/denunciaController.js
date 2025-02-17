import Denuncia from "../model/denuncia.js"

async function teste(req, res) {
    res.status(201).json("aoba");
}

async function criarDenuncia(req, res) {
    try{
        console.log(req.body);
        const denuncia = new Denuncia(req.body);
        await denuncia.save();
        res.status(201).json(denuncia);
    }
    catch(error){
        console.log(error);
        res.status(400).json(error);
    }
}

async function deletarDenuncia(req, res) {
    try{
        const denuncia = await Denuncia.findByIdAndDelete(req.params.id);
        if(denuncia){
            res.status(200).json(error);
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}

async function buscarDenuncia(req, res) {
    try{
        const denuncia = await Denuncia.findById(req.params.name);
        if(denuncia){
            res.status(200).json(denuncia);
        }
    }
    catch(error){
        res.status(400).json(error);
    }
}

async function atualizarDenuncia(req, res) {
    try{
        const denuncia = await Denuncia.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(denuncia){
            res.status(200).json(denuncia);
        }
    }
    catch(error){
        res.status(400).json({Erro: "num achei entao nao atualizei", error});
    }
}

export { teste, criarDenuncia, deletarDenuncia, buscarDenuncia, atualizarDenuncia };