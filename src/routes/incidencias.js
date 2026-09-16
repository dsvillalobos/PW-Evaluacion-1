import express from "express";
import * as incidenciasController from "../controllers/incidenciasController.js";
const router = express.Router();

router.get("/", incidenciasController.getIncidencias);
router.get("/:id", incidenciasController.getIncidenciaById);
router.post("/", incidenciasController.createIncidencia);

export default router;
