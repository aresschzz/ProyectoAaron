import { DataTypes } from "sequelize";
import db from "../services/db.js";

const Genero = db.define(
    "genero",
    {
        id_genero:{
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
