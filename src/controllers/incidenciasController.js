const incidencias = [
  {
    id: 1,
    empleado: "Juan Perez",
    area: "Contabilidad",
    descripcion: "Problema con la impresora",
    prioridad: "Alta",
    estado: "Pendiente",
  },
  {
    id: 2,
    empleado: "María García",
    area: "Recursos Humanos",
    descripcion: "Problema con el sistema de nómina",
    prioridad: "Alta",
    estado: "Pendiente",
  },
];

let numIncidencias = incidencias.length; // Comienza con 2

export const getIncidencias = function (req, res) {
  res.status(200).json(incidencias);
};

export const getIncidenciaById = function (req, res) {
  const id = req.params.id;

  for (let i = 0; i < incidencias.length; i++) {
    if (incidencias[i].id === parseInt(id)) {
      res.status(200).json(incidencias[i]);
      return;
    }
  }

  res.status(404).json({ message: "Incidencia no encontrada" });
};

export const createIncidencia = function (req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  // Validaciones
  if (
    !empleado?.trim() ||
    !area?.trim() ||
    !descripcion?.trim() ||
    !prioridad?.trim()
  ) {
    return res.status(400).json({
      message: "Debes ingresar todos los datos",
    });
  }

  if (prioridad !== "Alta" && prioridad !== "Media" && prioridad !== "Baja") {
    return res.status(400).json({ message: "Prioridad no valida" });
  }

  // Si pasa las validaciones, entonces hay que registrar la incidencia
  const nuevaIncidencia = {
    id: numIncidencias + 1,
    empleado: empleado,
    area: area,
    descripcion: descripcion,
    prioridad: prioridad,
    estado: "Pendiente", // Por defecto, el estado inicial es Pendiente
  };

  numIncidencias++;
  incidencias.push(nuevaIncidencia);

  res.status(201).json({ message: "Incidencia creada exitosamente" });
};

export const cambiarEstadoIncidencia = function (req, res) {
  const id = parseInt(req.params.id);
  const { estado } = req.body;

  const incidencia = incidencias.find((incidencia) => incidencia.id === id);

  if (!incidencia) {
    return res.status(404).json({
      message: "Incidencia no encontrada",
    });
  }

  switch (estado) {
    case "Pendiente":
      incidencia.estado = "Pendiente";
      break;

    case "En Proceso":
      incidencia.estado = "En Proceso";
      break;

    case "Resuelta":
      incidencia.estado = "Resuelta";
      break;

    case "Cancelada":
      incidencia.estado = "Cancelada";
      break;

    default:
      return res.status(400).json({
        message: "Estado no válido",
      });
  }

  return res.json({
    message: "Estado actualizado correctamente",
    incidencia: incidencia,
  });
};

export const getEstadisticas = function (req, res) {
  const pendientes = incidencias.filter(
    (incidencia) => incidencia.estado.toLowerCase() === "pendiente",
  ).length;

  const enProceso = incidencias.filter(
    (incidencia) => incidencia.estado.toLowerCase() === "en proceso",
  ).length;

  const resueltas = incidencias.filter(
    (incidencia) => incidencia.estado.toLowerCase() === "resuelta",
  ).length;

  const canceladas = incidencias.filter(
    (incidencia) => incidencia.estado.toLowerCase() === "cancelada",
  ).length;

  res.json({
    totalIncidencias: incidencias.length,
    pendientes: pendientes,
    enProceso: enProceso,
    resueltas: resueltas,
    canceladas: canceladas,
  });
};

export const delIncidenciaById = function (req, res) {
  const id = parseInt(req.params.id);

  // findIndex recibe una función comparadora directa
  const index = incidencias.findIndex((item) => item.id === id);

  // Si no existe, findIndex retorna -1
  if (index === -1) {
    return res.status(404).json({ message: "Incidencia no encontrada" });
  }

  // Elimina exactamente 1 elemento en la posición encontrada
  incidencias.splice(index, 1);

  return res.json({ message: "Incidencia eliminada correctamente" });
};

//-------------------------------------------------------

export const clasificacionIncidencia = function (req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Debes ingresar los datos" });
  }

  // Se busca el objeto
  const incidenciaEncontrada = incidencias.find(
    (item) => item.id === parseInt(id),
  );

  if (!incidenciaEncontrada) {
    return res.status(404).json({ message: "Incidencia no encontrada" });
  }

  switch (incidenciaEncontrada.prioridad) {
    case "Alta":
      return res.json({ id, clasificacion: "Critica" });

    case "Media":
      return res.json({ id, clasificacion: "Importante" });

    case "Baja":
      return res.json({ id, clasificacion: "Normal" });

    default:
      return res.status(400).json({ message: "Prioridad no válida" });
  }
};
