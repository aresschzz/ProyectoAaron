import { DataTypes } from "sequelize";
import db from "../db.js";
import Rol from "./Rol.js";
import Direccion from "./Direccion.js";

const Usuario = db.define(
  "usuario",
  {
    id_user: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    apellido_pa: {
      type: DataTypes.STRING(50),
    },
    apellido_ma: {
      type: DataTypes.STRING(50),
    },
    telefono: {
      type: DataTypes.STRING(10),
    },
    correo: {
      type: DataTypes.STRING(50),
    },
    password: {
      type: DataTypes.STRING(250),
    },
  },

  {
    freezeTableName: true,
    timestamps: false,
  },
);

Usuario.belongsTo(Rol, {
  foreignKey: "id_rol",
});
Usuario.belongsTo(Direccion, {
  foreignKey: "id_direccion",
});


export default Usuario;
