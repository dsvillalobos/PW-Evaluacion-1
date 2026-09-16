import express from "express";
import * as incidenciasController from "../controllers/incidenciasController.js";
const router = express.Router();

router.get("/", incidenciasController.getIncidencias);
router.get("/:id", incidenciasController.getIncidenciaById);
router.get("/:id/:clasificacion", incidenciasController.clasificacionIncidencia);
router.post("/", incidenciasController.createIncidencia);
router.delete("/:id", incidenciasController.delIncidenciaById);
export default router;
