import { DataTypes } from "sequelize";
import db from "../services/db.js";
import Rol from "./Rol.js";

const User = db.define(
  "user",
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

User.belongsTo(Rol, { 
    foreignKey: 'id_rol' 
});

export default User;
