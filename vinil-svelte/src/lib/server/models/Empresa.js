import { DataTypes } from "sequelize";
import db from "../services/db.js";

const Empresa = db.define(
    "empresa",
    {
        id_empresa:{
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

export default Empresa;
