import CamionCamionero from "../models/camionCamionero.js";
import Camion from "../models/camion.js";
import Camionero from "../models/camionero.js";

const asignarCamion = async(req,res)=>{
    const {cuilCamionero,patenteCamion,fecha} = req.body;
    try {
        const existeCamionero = await Camionero.findByPk(cuilCamionero);
        const existeCamion = await Camion.findByPk(patenteCamion);
        if(!existeCamionero || !existeCamion){
            res.status(400).json({
                message:'Camión o camionero no encontrado'
            })
        }
        const nuevaAsignacion = await CamionCamionero.create({
            cuilCamionero,patenteCamion,fecha
        })

        res.status(201).json({
            message: 'Asignación creada con éxito 🚛',
            data: nuevaAsignacion,
            });
    } catch (error) {
        res.status(500).json({
        message: 'Error al crear asignación ❌',
        error: error.message,
    })
    }
};

// traer los registros
const obtenerAsignaciones = async(req,res)=>{
    try {
        const asignaciones = await CamionCamionero.findAll({
            include:[Camion,Camionero]
        });

        res.status(200).json({
        message: 'Asignaciones encontradas ✅',
        asignaciones,});
    } catch (error) {
        res.status(500).json({
        message: 'Error al obtener asignaciones ❌',
        error: error.message,
    });
    }
};

// obtener por patente de camion
const asignacionPorCamion = async(req,res)=>{
    const {patente} = req.params;
    try {
        const camion = await Camion.findByPk(patente);

        if (!camion) {
            return res.status(404).json({
                message: `No existe un camión con patente ${patente}`
            });
        }
    const asignaciones = await CamionCamionero.findAll({
        where:{patenteCamion:patente},
        include:[{model:Camionero,as:'camionero'}]
    });

    if (asignaciones.length === 0) {
            return res.status(200).json({
                message: `El camión ${patente} existe pero aún no tiene asignaciones.`,
                asignaciones: []
            });
        }
    res.status(200).json({
    message: `Asignaciones del camión ${patente}`,
    asignaciones,
    });

    } catch (error) {
        res.status(500).json({
        message: 'Error al obtener asignaciones ❌',
        error: error.message,
        });
    }
};

const asignacionPorCamionero = async(req,res)=>{
    const {cuil} = req.params;
    try {
        const camionero = await Camionero.findByPk(cuil);
        if (!camionero) {
            return res.status(404).json({
                message: `No existe un camionero con cuil ${cuil}`
            });
        }
        const asignaciones = await CamionCamionero.findAll({
            where:{cuilCamionero:cuil},
            include:[{model:Camion,as:'camion'}]
        })

        if (asignaciones.length === 0) {
            return res.status(200).json({
                message: `El camionero ${cuil} existe pero aún no tiene asignaciones.`,
                asignaciones: []
            });
        }

        res.status(200).json({
        message: `Asignaciones del camionero ${cuil}`,
        asignaciones,
        });
    } catch (error) {
        res.status(500).json({
        message: 'Error al obtener asignaciones del camionero ❌',
        error: error.message,
        });
    }
}


export {
    asignarCamion,
    obtenerAsignaciones,
    asignacionPorCamion,
    asignacionPorCamionero
}