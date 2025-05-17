import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Provincia = sequelize.define('Provincia',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:{
                    args: [2, 45],
                    msg: 'Debe tener entre 2 y 45 caracteres como máximo'
                }
            }
    }
},{
    tableName:'provincias',
    timestamps:false
})

export default Provincia;