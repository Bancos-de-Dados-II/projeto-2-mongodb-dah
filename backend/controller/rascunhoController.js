import { client } from "../database/server.js";

const key = `ocorrencias`;

export async function salvarRascunho(req, res) {
  const { titulo, tipo, data, hora, lat, lng } = req.body;
  const cordenada = {
    type: "Point",
    coordinates: [lat, lng],
  };

  const ocorrenciaRascunho = {
    titulo,
    tipo,
    data,
    hora,
    cordenada,
  };

  await client.del(key);
  const response = await client.set(key, JSON.stringify(ocorrenciaRascunho), { EX: 3600 });
  if (response !== "OK") {
    return res.status(400).json({ erro: "Erro ao salvar ocorrência" });
  }
  const rascunho = await client.get(key);
  res.status(201).json(JSON.parse(rascunho));
}

export async function recuperarRascunho(req, res) {
  const rascunho = await client.get(key);
  res.json(JSON.parse(rascunho));
}
