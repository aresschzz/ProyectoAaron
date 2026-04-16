import { DataTypes } from "sequelize";
import db from "../services/db.js";

const Estatus = db.define(
    "estatus",
    {
        id_estatus:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        nombre:{
            type: DataTypes.STRING(100)
        }
    },
  {
    freezeTableName: true,
    timestamps: false,
  }
)

export default Estatus;
