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
