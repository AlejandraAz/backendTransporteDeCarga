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
        allowNull:false
    },
    modelo:{
        type:DataTypes.STRING,
        allowNull:false
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
    timestamps:false
});

export default Camion;