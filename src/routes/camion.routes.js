import { Router } from "express";
import {traerTodosCamiones,traerUnCamionPK,agregarCamion,eliminarCamion,actualizarCamion} from "../controllers/camion.controllers.js"; //este es el middleware


const router = Router();
// esta ruta recuperará los camiones de la bd

router.get('/',traerTodosCamiones);
router.get('/:patente',traerUnCamionPK); // ejemplo de prueba: localhost:3000/camiones/af105bc
router.post('/',agregarCamion); //ejemplo localhost:3000/camiones y enviar datos al body y verificar que este en json
// router.put('/:patente',actualizarCamion);
router.put('/:patente',actualizarCamion);
router.delete('/:patente',eliminarCamion);
export default router;