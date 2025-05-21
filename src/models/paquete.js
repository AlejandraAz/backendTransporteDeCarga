import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Paquete = sequelize.define(
  "Paquete",
  {
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      validate: {
        len: {
          args: [5, 9],
          msg: "El código debe tener entre 5 y 9 caracteres",
        },
      },
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 80],
          msg: "Este campo no debe estar vacío,se permiten hasta 80 caracteres como máximo",
        },
      },
    },
    nombreDestinatario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [2, 40],
          msg: "No se permiten mas de 40 caracteres",
        },
      },
    },
    domicilioDestinatario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // no se permiten cadenas vacías
        len: {
          args: [5, 80],
          msg: "Solo se permiten hasta 80 caracteres",
        },
      },
    },
    cuilCamionero: {
      //lo que es la FK lo declaramos de manualmente para tener mayor control
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "camioneros",
        key: "cuil",
      },
    },
    provinciaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "provincias",
        key: "id",
      },
    },
  },
  {
    tableName: "paquetes",
    timestamps: false,
  }
);

export default Paquete;
