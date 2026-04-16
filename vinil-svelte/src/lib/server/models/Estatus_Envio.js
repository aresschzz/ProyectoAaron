import { DataTypes } from "sequelize";
import db from "../db.js";

const Estatus_Envio = db.define(
  "estatus_envio",
  {
    id_estatus_envio: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default Estatus_Envio;
