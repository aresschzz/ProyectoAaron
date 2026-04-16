import { DataTypes } from "sequelize";
import db from "../db.js";

const Direccion = db.define(
  "direccion",
  {
    id_direccion: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    calle: {
      type: DataTypes.STRING(150),
    },
    numero_ext: {
      type: DataTypes.INTEGER,
    },
    numero_int: {
      type: DataTypes.INTEGER,
    },
    colonia: {
      type: DataTypes.STRING(50),
    },
    ciudad: {
      type: DataTypes.STRING(100),
    },
    estado: {
      type: DataTypes.STRING(100),
    },
    codigo_postal: {
      type: DataTypes.STRING(10),
    },
    referencia: {
      type: DataTypes.STRING(150),
    },
  },
  { timestamps: false, freezeTableName: true },
);

export default Direccion;
