// *Verifica la Conexión (Opcional):**
import express from "express";
import sequelize from './src/db/connection.js';
import {
  Camion,
  Camionero,
  Paquete,
  Provincia,
  CamionCamionero,
} from "./src/models/index.js";
import camionRoutes from "./src/routes/camion.routes.js";
import camioneroRoutes from "./src/routes/camionero.routes.js";
import provinciaRoutes from "./src/routes/provincia.routes.js";
import paqueteRoutes from "./src/routes/paquete.routes.js";
import camionCamioneroRoutes from "./src/routes/camionCamionero.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor levantado ✨💪");
});

app.use("/camiones", camionRoutes); //hago referencia a las routes de camion
app.use("/camioneros", camioneroRoutes); //referencia a la rutas de los camioneros
app.use("/provincias", provinciaRoutes); //ref a la Route de provincias
app.use("/paquetes", paqueteRoutes); //ref a los paqute
app.use("/asignaciones",camionCamioneroRoutes); //ref a la tabla intermedia

// Iniciar servidor y probar conexión DB
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la Bd establecida✨💪");
    // Sincroniza modelos (más sobre esto en el Paso 3)
    await sequelize.sync({ force: false });
    // await sequelize.sync({ alter: true });  //para sincronizar mis cambios de validacion en los modelos
    console.log("🔄 Modelos sincronizados con la base de datos.");

    // Inicia el servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error de conexión ❌", error);
  }
}

startServer();
