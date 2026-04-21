import { DataTypes } from "sequelize";
import db from "../db.js";
import Empresa from "./Empresa.js";
import Artista from "./Artista.js";
import Genero from "./Genero.js";

const Catalogo_Vinilo = db.define(
  "catalogo_vinilo",
  {
    id_catalogo_vinilo: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    nombre_albums: {
      type: DataTypes.STRING(150),
    },
    anio: {
      type: DataTypes.DATEONLY,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

Catalogo_Vinilo.belongsTo(Artista, { 
  foreignKey: "id_artista",
  as: "artista"
});

Catalogo_Vinilo.belongsTo(Empresa, { 
  foreignKey: "id_empresa",
  as: "empresa"
});

Catalogo_Vinilo.belongsTo(Genero, { 
  foreignKey: "id_genero",
  as: "genero"
});

export default Catalogo_Vinilo;
