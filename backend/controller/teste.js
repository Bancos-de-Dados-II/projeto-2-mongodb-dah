import Denuncia from "../model/denuncia.js"

async function teste(req, res) {
    res.status(201).json("Tranquilo");
}

async function criar(req, res) {
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

async function ver(req, res) {
    try{
        const achei = await Denuncia.find({});
        res.status(200).json(achei);
    }
    catch(error){
        res.status(400).json({como: "isso nao devia acontecer", error});
    }
}

export { criar, ver, teste };