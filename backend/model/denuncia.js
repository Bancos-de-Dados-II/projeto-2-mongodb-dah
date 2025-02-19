import { HostNotReachableError } from 'sequelize';
import mongoose from '../database/mongoose.js';

const DenunciaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  localizacao: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  tipo: {
    type: String,
    required: true,
  },

  dataOcorrencia: {
    type: Date,
    required: true,
  },

  horarioOcorrencia: {
    type: String,
    required: true,
  },

  descricao: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Aberta',
  }
});

// Índice para consultas geoespaciais
DenunciaSchema.index({ localizacao: '2dsphere' });

const Denuncia = mongoose.model('Denuncia', DenunciaSchema);

export default Denuncia;
