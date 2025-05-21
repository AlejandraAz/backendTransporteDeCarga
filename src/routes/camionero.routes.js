import { Router } from "express";
import { traerCamioneros,traerCamioneroPK,agregarCamionero,actualizarCamionero, eliminarCamionero } from "../controllers/camionero.controllers.js";

const router = Router();

router.get('/',traerCamioneros);
router.get('/:cuil',traerCamioneroPK);
router.post('/',agregarCamionero);
router.put('/:cuil',actualizarCamionero);
router.delete('/:cuil',eliminarCamionero)

export default router;