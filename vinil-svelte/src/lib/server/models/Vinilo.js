import { DataTypes } from "sequelize";
import db from "../services/db.js";
import Catalogo_Vinilo from "./Catalogo_Vinilo.js";
import Estatus from "./Estatus.js";


const Vinilo = db.define(
    "vinilo",
    {
        id_vinilo:{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        precio_venta:{
            type: DataTypes.DECIMAL(5,2)
        },
        precio_compra:{
            type: DataTypes.DECIMAL(5,2)

        },
        disponible:{
            type: DataTypes.BOOLEAN
        }
    },

  {
    freezeTableName: true,
    timestamps: false,
  }
)

Vinilo.belongsTo(Catalogo_Vinilo, { 
    foreignKey: 'id_catalogo' 
});


Vinilo.belongsTo(Estatus, { 
    foreignKey: 'id_estatus' 
});

export default Vinilo;
