import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Camion = sequelize.define('Camion',{
    patente:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
        unique:true
    },
    marca:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    modelo:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    capCarga:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:0
        }
    }
},{
    tableName:'camiones',
    timestamps:false,  // Necesario para paranoid debe estar en true
    //paranoid: true  Activa soft delete   no se elimina realmente un registro de la base de datos, sino que se marca como "eliminado"
    
});

export default Camion;