import { DataTypes } from "sequelize";
import db from "../db.js";

const Envio = db.define(
  "envio",
  {
    id_envio: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    numero_guia: {
      type: DataTypes.STRING(20),
    },
    costo_envio: {
      type: DataTypes.DECIMAL(10, 2),
    },
    fecha_envio: {
      type: DataTypes.DATEONLY,
    },
    fecha_entrega_estimada: {
      type: DataTypes.DATEONLY,
    },
  },
  { timestamps: false, freezeTableName: true },
);

Envio.belongsTo(Orden, {
  foreignKey: "id_orden",
});
Envio.belongsTo(Paqueteria, {
  foreignKey: "id_paqueteria",
});
Envio.belongsTo(Direccion, {
  foreignKey: "id_direccion",
});

export default Envio;
