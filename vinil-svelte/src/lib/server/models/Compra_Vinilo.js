import { DataTypes } from "sequelize";
import db from "../db.js";
import User from "./Usuario.js";

const Compra_Vinilo = db.define(
  "compra_vinilo",
  {
    id_compra_vinilo: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

Compra_Vinilo.belongsTo(User, { foreignKey: "id_usuario" });

export default Compra_Vinilo;
