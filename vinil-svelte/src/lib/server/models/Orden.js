import { DataTypes } from "sequelize";
import db from "../services/db.js";
import User from "./User.js"

const Orden = db.define(
    "orden",
    {
        id_orden:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        fecha:{
            type: DataTypes.DATE
        },
        total:{
            type: DataTypes.DECIMAL(5,2)
        }
    },

  {
    freezeTableName: true,
    timestamps: false,
  }
)

Orden.belongsTo(User, { 
    foreignKey: 'id_user' 
})

export default Orden;
