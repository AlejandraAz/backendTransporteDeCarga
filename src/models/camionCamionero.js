import { DataTypes } from "sequelize";
import sequelize from "../db/connection.js";

const CamionCamionero = sequelize.define('CamionCamionero',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    cuilCamionero:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:'camioneros',
            key:'cuil'
        }
    },
    patenteCamion:{
        type:DataTypes.STRING,
        allowNull:false,
        references:{
            model:'camiones',
            key:'patente'
        }
    },
    fecha:{
        type:DataTypes.DATE,
        allowNull: false,
        validate:{
            isDate:true
        }
    }
},{
    tableName:'camionCamionero',
    timestamps:true,
    indexes:[  //indexes se utiliza para evitar que se dupliquen los datoos ya que mi tabla tiene un id definido pq los camioens no puede ser manejados por el mismo chofer en le mismo dia
        {
            unique:true,
            fields:['cuilCamionero','patenteCamion','fecha']
        }
    ]
});

export default CamionCamionero;