import { DataTypes } from "sequelize";
import db from "../db.js";
import Catalogo_Vinilo from "./Catalogo_Vinilo.js";
import Estado_Vinilo from "./Estado_Vinilo.js";

const Vinilo = db.define(
    "vinilo",
    {
        id_vinilo: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        precio_venta: {
            type: DataTypes.DECIMAL(5, 2)
        },
        precio_compra: {
            type: DataTypes.DECIMAL(5, 2)
        },
        disponible: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

Vinilo.belongsTo(Catalogo_Vinilo, { foreignKey: 'id_catalogo' });
Vinilo.belongsTo(Estado_Vinilo, { foreignKey: 'id_estado_vinilo' });

export default Vinilo;