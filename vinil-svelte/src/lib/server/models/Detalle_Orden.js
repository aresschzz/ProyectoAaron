import { DataTypes } from "sequelize";
import db from "../db.js";
import Orden from "./Orden.js";
import Vinilo from "./Vinilo.js";

const Detalle_Orden = db.define(
  "detalle_orden",
  {
    id_detalle_o: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    precio: {
      type: DataTypes.DECIMAL(5, 2),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Detalle_Orden.belongsTo(Orden, { foreignKey: "id_orden" });
Detalle_Orden.belongsTo(Vinilo, { foreignKey: "id_vinilo" });

// Solo define la asociación si no existe ya
if (!Orden.associations?.detalles) {
  Orden.hasMany(Detalle_Orden, { foreignKey: "id_orden", as: "detalles" });
}

export default Detalle_Orden;