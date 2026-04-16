import { DataTypes } from "sequelize";
import db from "../db.js";

const Rol = db.define(
  "rol",
  {
    id_rol: {
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

export default Rol;
