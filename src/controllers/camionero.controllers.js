import Camionero from "../models/camionero.js";
import { ValidationError } from "sequelize"; //buenisimo para implentear en errores

const traerCamioneros = async (req, res) => {
  try {
    const camioneros = await Camionero.findAll();

    res.status(200).json({
      message: "La solicitud ha tenido éxito ✨",
      camioneros,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};

//****************/
const traerCamioneroPK = async (req, res) => {
  const { cuil } = req.params;
  try {
    const camionero = await Camionero.findByPk(cuil);

    if (!camionero) {
      return res.status(404).json({
        message: `No existe un camionero con el cuil ${cuil}`,
      });
    }
    res.status(200).json({
      message: "Solicitud generada con éxito",
      camionero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error de servidor ❌",
      error: error.message,
    });
  }
};

//****************/
const agregarCamionero = async (req, res) => {
  const { cuil, nombre, direccion, salario, telefono } = req.body;
  try {
    const nuevoCamionero = await Camionero.create({
      cuil,
      nombre,
      direccion,
      salario,
      telefono,
    });
    res.status(201).json({
      message: "Camionero añadido éxitosamente 👏",
      camionero: nuevoCamionero,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      // Extraer mensajes de error
      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    }
    res.status(500).json({
      message: "Error servidor",
      error: error.message,
    });
  }
};

const actualizarCamionero = async (req, res) => {
  try {
    const { cuil } = req.params;
    const { nombre, direccion, salario, telefono } = req.body;

    const camionero = await Camionero.findByPk(cuil);

    if (!camionero) {
      return res.status(404).json({
        message: "El camionero con ese cuil no existe en la BD",
      });
    }

    const camposAct = {};
    if (
      nombre !== undefined ||
      direccion !== undefined ||
      salario !== undefined ||
      telefono !== undefined
    ) {
      camposAct.nombre = nombre;
      camposAct.direccion = direccion;
      camposAct.salario = salario;
      camposAct.telefono = telefono;
    }

    const camioneroActualizado = await camionero.update(camposAct);

    res.status(200).json({
      message: "Camionero actualizado correctamente 💪",
      camioneroActualizado,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      // Extraer mensajes de error
      const errores = error.errors.map((err) => err.message);
      return res.status(400).json({ errores });
    }

    console.error("Error al actualizar el camionero:", error);
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};

const eliminarCamionero = async (request, response) => {
  const { cuil } = request.params;
  try {
    const camionero = await Camionero.findByPk(cuil);
    if (!camionero) {
      return response.status(404).json({
        message: "No existe el camionero con ese cuil",
      });
    }

    await camionero.destroy();
    response.status(200).json({
      message: "El camionero fue eliminado correctamentamente de la BD",
    });
  } catch (error) {
    response.status(500).json({
      message: "Error del servidor ",
      error: error.message,
    });
  }
};
export {
  traerCamioneros,
  traerCamioneroPK,
  agregarCamionero,
  actualizarCamionero,
  eliminarCamionero,
};
