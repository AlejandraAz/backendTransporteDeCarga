import { Router } from "express";
import { Camion } from "../models/camion.js";

const router = Router();

// esta ruta recuperará los camiones de la bd

router.get('/camion',async(req,res)=>{
    try{
        //Camion.findAll(); Método de Sequelize para obtener todos los registros
            // de la tabla asociada al modelo 'Cliente'.
            // Devuelve una promesa que resuelve con un array de instancias de Cliente.
        const camiones = await Camion.findAll();
        res.status(200).json(camiones);
    }catch(error){
        console.error('error al obtener camiones',error);
        res.status(500).json({message:'Error interno del servidor',error:error.message})
    }
});

export default router;