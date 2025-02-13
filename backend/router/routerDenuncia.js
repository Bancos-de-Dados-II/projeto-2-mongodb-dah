const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");
const Usuario = require("./usuario");
class Denuncia extends Model {}
Denuncia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria: {
      type: DataTypes.ENUM("roubo", "violência", "tráfico"),
      allowNull: false,
    },
    imagem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pendente", "em andamento", "resolvido"),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    data_denuncia: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Usuario,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Denuncia",
    tableName: "denuncias",
    timestamps: false,
  }
);
Usuario.hasMany(Denuncia, { foreignKey: "usuarioId", as: "denuncias" });
Denuncia.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
module.exports = Denuncia;
