const incidencias = [
  {
    id: 1,
    empleado: "Juan Perez",
    area: "Contabilidad",
    descripcion: "Problema con la impresora",
    prioridad: "Alta",
  },
  {
    id: 2,
    empleado: "María García",
    area: "Recursos Humanos",
    descripcion: "Problema con el sistema de nómina",
    prioridad: "Alta",
  },
];

export const getIncidencias = function (req, res) {
  res.json(incidencias);
};

export const getIncidenciaById = function (req, res) {
  const id = req.params.id;

  for (let i = 0; i < incidencias.length; i++) {
    if (incidencias[i].id === parseInt(id)) {
      res.json(incidencias[i]);
      return;
    }
  }

  res.json({ message: "Incidencia no encontrada" });
};

export const createIncidencia = function (req, res) {
  const { empleado, area, descripcion, prioridad } = req.body;

  const nuevaIncidencia = {
    id: incidencias.length + 1,
    empleado: empleado,
    area: area,
    descripcion: descripcion,
    prioridad: prioridad,
  };

  incidencias.push(nuevaIncidencia);

  res.status(201).json({ message: "Incidencia creada exitosamente" });
};

export const delIncidenciaById = function (req, res) {
  const id = parseInt(req.params.id);

  // findIndex recibe una función comparadora directa
  const index = incidencias.findIndex(item => item.id === id);

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
  const incidenciaEncontrada = incidencias.find(item => item.id === parseInt(id));

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
