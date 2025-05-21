import Paquete from "../models/paquete.js";
import Provincia from "../models/provincia.js";
import Camionero from "../models/camionero.js";
import { ValidationError } from "sequelize";

const traerPaquetes = async (req, res) => {
  try {
    const paquetes = await Paquete.findAll({
      include: [
        {
          model: Provincia,
          attributes: ["id", "nombre"],
        },
        { model: Camionero, attributes: ["cuil"] },
      ],
    });
    res.status(200).json({
      message: "Solicitud lograda con éxito 💪",
      paquetes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};

const traerPaqueteId = async (req, res) => {
  const { codigo } = req.params;
  try {
    const paquete = await Paquete.findByPk(codigo);
    if (!paquete) {
      return res.status(404).json({
        message: "No existe el paquete con ese código",
      });
    }
    res.status(200).json({
      message: "Operación generada con éxito 👏",
      paquete,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor ❌",
      error: error.message,
    });
  }
};

const agregarPaquete = async (req, res) => {
  const {
    codigo,
    descripcion,
    nombreDestinatario,
    domicilioDestinatario,
    cuilCamionero,
    provinciaId,
  } = req.body;

  try {
    if (
      !codigo ||
      !descripcion ||
      !nombreDestinatario ||
      !domicilioDestinatario ||
      !cuilCamionero ||
      !provinciaId
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    //para verificar que el paquete no existe
    const verificarPK = await Paquete.findByPk(codigo);
    if (verificarPK) {
      return res.status(404).json({
        message: "El paquete con ese codigo ya existe",
      });
    }
    //para verificar que la provincia existe
    const verificarProvincia = await Provincia.findByPk(provinciaId);
    if (!verificarProvincia) {
      return res.status(400).json({
        message: "Provincia no encontrada",
      });
    }
    //para verificar que el camionero existe en la bd
    const verificarCamionero = await Camionero.findByPk(cuilCamionero);
    if (!verificarCamionero) {
      return res.status(400).json({
        message: "Camionero no encontrado",
      });
    }

    const nuevoPaquete = await Paquete.create({
      codigo,
      descripcion,
      nombreDestinatario,
      domicilioDestinatario,
      cuilCamionero,
      provinciaId,
    });
    res.status(201).json({
      message: "Paquete creado con éxito 💪",
      paquete: nuevoPaquete,
    });
  } catch (error) {
    if (
      [
        "SequelizeValidationError",
        "SequelizeForeignKeyConstraintError",
        "SequelizeUniqueConstraintError",
      ].includes(error.name)
    ) {
      return res.status(400).json({
        message: "Error de validación o de clave foránea",
        errors: error.errors
          ? error.errors.map((e) => e.message)
          : [error.message],
      });
    }
    res
      .status(500)
      .json({ message: "Error al crear paquete", error: error.message });
  }
};

const actualizarPaquete = async (req, res) => {
  const { codigo } = req.params;
  const {
    descripcion,
    nombreDestinatario,
    domicilioDestinatario,
    cuilCamionero,
    provinciaId,
  } = req.body;
  try {
    const paquete = await Paquete.findByPk(codigo);
    if (!paquete) {
      return res.status(400).json({
        message: "El paquete con ese codigo no existe",
      });
    }
    //para verificar que la provincia existe
    const verificarProvincia = await Provincia.findByPk(provinciaId);
    if (!verificarProvincia) {
      return res.status(400).json({
        message: "Provincia no encontrada",
      });
    }
    //para verificar que el camionero existe en la bd
    const verificarCamionero = await Camionero.findByPk(cuilCamionero);
    if (!verificarCamionero) {
      return res.status(400).json({
        message: "Camionero no encontrado",
      });
    }
    const campoActualizado = {};
    if (
      descripcion !== undefined ||
      nombreDestinatario !== undefined ||
      domicilioDestinatario !== undefined ||
      cuilCamionero !== undefined ||
      provinciaId !== undefined
    ) {
      campoActualizado.descripcion = descripcion;
      campoActualizado.nombreDestinatario = nombreDestinatario;
      campoActualizado.domicilioDestinatario = domicilioDestinatario;
      campoActualizado.cuilCamionero = cuilCamionero;
      campoActualizado.provinciaId = provinciaId;
    }

    const paqueteActualizado = await paquete.update(campoActualizado);

    res.status(200).json({
      message: "Paquete actualizado..",
      paquete: paqueteActualizado,
    });
  } catch (error) {
    if (
      [
        "SequelizeValidationError",
        "SequelizeForeignKeyConstraintError",
        "SequelizeUniqueConstraintError",
      ].includes(error.name)
    ) {
      return res.status(400).json({
        message: "Error de validación o de clave foránea",
        errors: error.errors
          ? error.errors.map((e) => e.message)
          : [error.message],
      });
    }
    res.status(500).json({
      message: "Error al actualizar la provincia",
      error: error.message,
    });
  }
};

const eliminarPaquete = async (req, res) => {
  const { codigo } = req.params;
  try {
    const paquete = await Paquete.findByPk(codigo);
    if (!paquete) {
      return res.status(400).json({
        message: "No se encuentra un paquete con ese codigo",
      });
    }

    await paquete.destroy();
    res.status(200).json({
      message: "Paquete elimando de la bd",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};

export {
  traerPaquetes,
  traerPaqueteId,
  agregarPaquete,
  actualizarPaquete,
  eliminarPaquete,
};
