import Provincia from "../models/provincia.js";

const traerProvincias = async (req, res) => {
  try {
    const provincias = await Provincia.findAll();

    res.status(200).json({
      message: "La solicitud ha tenido éxito",
      provincias,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error de servidor",
      error: error.message,
    });
  }
};

const traerProvinciaID = async (req, res) => {
  const { id } = req.params;

  try {
    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      return res.status(404).json({
        msg: `La provincia ingresada no se encuentra en la bd`,
      });
    }
    res.status(200).json({
      msg: `¡Operación éxitosa!`,
      provincia,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
      error: error.msg,
    });
  }
};

const agregarProvincia = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const nombreProv = await Provincia.findOne({ where: { nombre } });

    if (nombreProv) {
      return res.status(409).json({
        msg: "Ya existe la provincia con ese nombre",
      });
    }

    const buscarProvincia = await Provincia.findByPk(id);
    if (buscarProvincia) {
      return res.status(409).json({
        message: "Ya existe la provincia en la BD",
      });
    }
    const nuevaProvincia = await Provincia.create({ nombre });
    res.status(201).json({
      message: "Provincia agregada correctamente ✅",
      nombre: nuevaProvincia,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor ❌",
      error: error.message,
    });
  }
};

const actualizarProvincia = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      res.status(404).json({
        msg: "Dato ingresado incorrecto",
      });
    }
    const campoActualizado = {};
    if (nombre !== undefined) {
      campoActualizado.nombre = nombre;
    }
    const provinciaAct = await provincia.update(campoActualizado);

    res.status(200).json({
      msg: "Provincia actualizada correctamente",
      provinciaAct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la provincia",
      error: error.message,
    });
  }
};

const eliminarProvincia = async (req, res) => {
  const { id } = req.params;
  try {
    const provincia = await Provincia.findByPk(id);
    if (!provincia) {
      return res.status(404).json({
        msg: "Dato ingresado incorrecto",
      });
    }
    await provincia.destroy();
    res.status(200).json({
      message: "Provincia eliminada de la BD",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};
export {
  traerProvincias,
  traerProvinciaID,
  agregarProvincia,
  actualizarProvincia,
  eliminarProvincia,
};
