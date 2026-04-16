import { DataTypes } from "sequelize";
import db from "../db.js";

const Estado_Vinilo = db.define(
  "estado_vinilo",
  {
    id_estado_vinilo: {
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

export default Estado_Vinilo;
