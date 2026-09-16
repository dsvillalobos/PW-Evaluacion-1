import express from "express";
const app = express();

app.use(express.json());

// Importar rutas
import incidenciasRoutes from "./routes/incidencias.js";

app.use("/incidencias", incidenciasRoutes);

app.listen(3000, function () {
  console.log("El servidor esta corriendo en el puerto: 3000");
});
