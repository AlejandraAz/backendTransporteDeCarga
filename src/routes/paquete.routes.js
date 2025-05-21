import { Router } from "express";
import { traerPaquetes,traerPaqueteId,agregarPaquete,actualizarPaquete,eliminarPaquete } from "../controllers/paquetes.controllers.js";

const router = Router();

router.get('/',traerPaquetes);
router.get('/:codigo',traerPaqueteId);
router.post('/',agregarPaquete);
router.put('/:codigo',actualizarPaquete);
router.delete('/:codigo',eliminarPaquete);

export default router;