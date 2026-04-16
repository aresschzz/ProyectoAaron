import { DataTypes } from "sequelize";
import db from "../services/db.js";
import Orden from "./Orden.js";
import Vinilo from "./Vinilo.js";

const Detalle_Orden = db.define(
    "detalle_orden",
    {
        id_detalle_o: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        precio: {
            type: DataTypes.DECIMAL(5, 2)
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Detalle_Orden.belongsTo(Orden, { 
    foreignKey: 'id_orden' 
});

Detalle_Orden.belongsTo(Vinilo, { 
    foreignKey: 'id_vinilo' 
});

export default Detalle_Orden;