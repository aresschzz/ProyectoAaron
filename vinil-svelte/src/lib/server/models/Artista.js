import { DataTypes } from "sequelize";
import db from "../services/db.js";

const Artista = db.define("artista", {
    id_artista: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(150)
    }
}, {
    freezeTableName: true,
    timestamps: false,
});

export default Artista;