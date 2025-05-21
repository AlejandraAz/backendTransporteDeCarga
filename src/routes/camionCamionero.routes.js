import { Router } from "express";
import { asignarCamion,obtenerAsignaciones,asignacionPorCamion,asignacionPorCamionero } from "../controllers/camionCamionero.controllers.js";

const router = Router();

router.get('/',obtenerAsignaciones);
router.get('/camion/:patente',asignacionPorCamion);
router.get('/camionero/:cuil',asignacionPorCamionero);
router.post('/',asignarCamion);

export default router;