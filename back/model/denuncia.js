import sequelize from "../database/sequelize.js";
import { DataTypes } from "sequelize";

const Denuncia = sequelize.define('denuncia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    localizacao: {
        type: DataTypes.GEOMETRY('POINT'),
        allowNull: false
    }, 
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Denuncia.sync();
export default Denuncia;