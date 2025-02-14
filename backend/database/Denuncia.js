import sequelize from "./sequelize.js";
import { DataTypes } from "sequelize";

const Denuncia = sequelize.define('denuncias', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    id:{
        type: sequelize.Sequelize.UUID,
        DataTypes.UUIDV4,
        primaryKey: true
    },
    localizacao{
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Aberta'
    }
});