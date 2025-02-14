require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("🟢 Conectado ao MongoDB"))
  .catch((err) => console.error("🔴 Erro ao conectar ao MongoDB:", err));

// Definir o modelo de dados
const OcorrenciaSchema = new mongoose.Schema({
  titulo: String,
  tipo: String,
  data: String,
  hora: String,
  latitude: Number,
  longitude: Number
});

const Ocorrencia = mongoose.model("Ocorrencia", OcorrenciaSchema);

// Criar uma ocorrência (POST)
app.post("/api/ocorrencias", async (req, res) => {
  try {
    const ocorrencia = new Ocorrencia(req.body);
    await ocorrencia.save();
    res.status(201).json(ocorrencia);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar a ocorrência" });
  }
});

// Listar todas as ocorrências (GET)
app.get("/api/ocorrencias", async (req, res) => {
  try {
    const ocorrencias = await Ocorrencia.find();
    res.json(ocorrencias);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar ocorrências" });
  }
});

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
