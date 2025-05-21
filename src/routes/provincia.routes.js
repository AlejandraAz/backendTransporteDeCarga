import { Router } from "express";
import  {traerProvincias,traerProvinciaID,agregarProvincia,actualizarProvincia,eliminarProvincia}  from "../controllers/provincia.controllers.js";

const router = Router();

router.get('/',traerProvincias);
router.get('/:id',traerProvinciaID);
router.post('/',agregarProvincia);
router.put('/:id',actualizarProvincia);
router.delete('/:id',eliminarProvincia);

export default router;
