//importando los modelos
import sequelize from "../db/connection.js";
import Camionero  from "./camionero.js";
import  Paquete  from "./paquete.js";
import  Provincia  from "./provincia.js";
import  CamionCamionero  from "./camionCamionero.js";
import  Camion  from "./camion.js";

/*Relación de 1:N */
Provincia.hasMany(Paquete,{     //lEntiendo que provincia tiene muchos paq, y que defino la FK y en sourceKey menciono de  que viene de la clave
    foreignKey:'idProvincia',
    sourceKey:'id'
});

Paquete.belongsTo(Provincia,{
    foreignKey:'idProvincia',
    targetKey:'id'
});

/*  1:N camionero a paquetes */ 
Camionero.hasMany(Paquete,{
    foreignKey:'cuilCamionero',
    sourceKey:'cuil'
});

Paquete.belongsTo(Camionero,{
    foreignKey:'cuilCamionero',
    targetKey:'cuil'
});


// relacion de N:M camionxcamionero ,con throug hago referencia a la tabla intermedia,en este caso identifico los id, pq no estan desde el modelo identificados como un id,sino como cuil y patetnte
Camion.belongsToMany(Camionero,{
    through: 'CamionCamionero',
    foreignKey:'patenteCamion',
    otherKey:'cuilCamionero'
});
Camionero.belongsToMany(Camion,{
    through:'CamionCamionero',
    foreignKey:'cuilCamionero',
    otherKey:'patenteCamion'
});

//Esto te permite mantener tus modelos bien organizados y centralizar todas las asociaciones y relaciones en un solo lugar, al trasladarlos al index.js de la raíz
export {
    sequelize,
    Camion,
    Camionero,
    CamionCamionero,
    Paquete,
    Provincia
};