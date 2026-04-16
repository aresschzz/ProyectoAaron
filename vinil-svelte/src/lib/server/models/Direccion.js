import { DataTypes } from "sequelize";
import db from "../services/db.js";

const Direccion = db.define(
    "direccion",
    {
        id_direccion:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(150)
        }
    },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

export default Genero;
