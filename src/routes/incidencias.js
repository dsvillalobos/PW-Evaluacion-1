import express from "express";
import * as incidenciasController from "../controllers/incidenciasController.js";

const router = express.Router();

router.get("/", incidenciasController.getIncidencias);

router.get("/estadisticas", incidenciasController.getEstadisticas);

router.get("/:id", incidenciasController.getIncidenciaById);

router.put("/:id/estado", incidenciasController.cambiarEstadoIncidencia);

router.post("/", incidenciasController.createIncidencia);

router.delete("/:id", incidenciasController.delIncidenciaById);

export default router;