import { DataTypes } from "sequelize";
import db from "../services/db.js";
import Vinilo from "./Vinilo.js";
import Compra_Vinilo from "./Compra_Vinilo.js";

const Detalle_Compra = db.define(
    "detalle_compra",
    {
        id_detalle_c: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        precio_compra: {
            type: DataTypes.DECIMAL(5, 2)
        },
        estado: {
            type: DataTypes.STRING(100)
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Detalle_Compra.belongsTo(Compra_Vinilo, { 
    foreignKey: 'id_compra' 
});

Detalle_Compra.belongsTo(Vinilo, { 
    foreignKey: 'id_vinilo' 
});

export default Detalle_Compra;