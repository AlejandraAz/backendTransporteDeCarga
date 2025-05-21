import Camion from "../models/camion.js";

const traerTodosCamiones = async (req, res) => {
  try {
    //Método de Sequelize findAll() para obtener todos los registros de la tabla asociada al modelo 'Camion'.
    // Devuelve una promesa que resuelve con un array de instancias de Camion.
    const camiones = await Camion.findAll();
    console.log(camiones);
    res.status(200).json({
      message: "La solicitud ha tenido éxito ✨",
      camiones,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "El servidor ha encontrado una situación que no sabe cómo manejarla.",
      error: error.message,
    });
  }
};

//******************************* para traer por una primaryKey de camion */
const traerUnCamionPK = async (req, res) => {
  try {
    const { patente } = req.params; // 👈 Capturamos la patente desde la URL
    const camion = await Camion.findByPk(patente);
    if (!camion) {
      res.status(404).json({
        message: `No se encontró un camión con patente ${patente}`,
      });
    }
    res.status(200).json({
      message: "Encontrado con exito",
      camion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};

//**********POST  */
const agregarCamion = async (req, res) => {
  try {
    const { patente, marca, modelo, capCarga } = req.body; // se usa body para crear los params para obtener

    if (!patente || !marca || !modelo || capCarga === undefined) {
      return res.status(400).json({
        message: "Faltan datos obligatorios para crear el camión",
      });
    }

    const camionYaExiste = await Camion.findByPk(patente);
    if (camionYaExiste) {
      return res.status(409).json({
        message: "Ya existe un camión con esa patente",
      });
    }

    const nuevoCamion = await Camion.create({
      patente,
      marca,
      modelo,
      capCarga,
    });
    res.status(201).json({
      message: "Camión creado exitosamente 🚚✅",
      camion: nuevoCamion,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el camión ❌",
      error: error.message,
    });
  }
};

//**********Put */

const actualizarCamion = async (req, res) => {
  const { patente } = req.params;
  const { marca, modelo, capCarga } = req.body;
  try {
    const camion = await Camion.findByPk(patente);

    if (!camion) {
      return res
        .status(404)
        .json({ message: "Camión no encontrado para actualizar" });
    }

    const camposActualizables = {};
    if (marca !== undefined) camposActualizables.marca = marca;
    if (modelo !== undefined) camposActualizables.modelo = modelo;
    if (capCarga !== undefined) camposActualizables.capCarga = capCarga;

    const camionActualizado = await camion.update(camposActualizables);

    res.status(200).json({
      msg: "Camión actualizado con update()",
      camionActualizado,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map((e) => e.message),
      });
    }
    res
      .status(500)
      .json({ message: "Error al actualizar camión", error: error.message });
  }
};
//*****************Delete */
const eliminarCamion = async (req, res) => {
  const { patente } = req.params;

  try {
    const camion = await Camion.findByPk(patente);
    if (!camion) {
      return res.status(404).json({
        message: "Camión no encontrado",
      });
    }

    await camion.destroy(); //metodo para eliminar de la bd

    res.status(200).json({
      message: "Camion eliminado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error del servidor",
      error: error.message,
    });
  }
};
export {
  traerTodosCamiones,
  traerUnCamionPK,
  agregarCamion,
  actualizarCamion,
  eliminarCamion,
};
