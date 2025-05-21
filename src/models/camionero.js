import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const Camionero = sequelize.define('Camionero',{
    cuil:{
        type:DataTypes.STRING,
        primaryKey:true,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,11]
        }
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,25]
        }
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    salario:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:false
    }
},
{tableName:'camioneros',
    timestamps:false}
);

export default Camionero;