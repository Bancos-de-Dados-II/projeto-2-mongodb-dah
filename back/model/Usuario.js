import { DataTypes } from "sequelize";
import mongoose from "../database/mongoose.js";
import {randomUUID} from "crypto";
const {Schema} = mongoose;

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    id: {
        type: String,
        default: randomUUID,
        required: true
    }, 
        nome: {
        type: DataTypes.UUID,
        required: true
    },
        email: {
        type: String,
        required: true,
        unique: true
    },
      senha: {
        type: String,
        required: true
    },
    
    role: {
        type: String,
        enum: ['admin', 'autoridade', 'usuario'],
        default: 'usuario',
        required: true
        }
    }, 
    {
      timestamps: true
    
});
        
const Denuncia = mongoose.model('Usuario', usuarioSchema);
export default Usuario;const usuarioSchema = new Schema