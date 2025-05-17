// *Verifica la Conexión (Opcional):**

import express from 'express';

import sequelize from './src/db/connection.js';
import { Camion,Camionero,Paquete,Provincia,CamionCamionero, } from './src/models/index.js';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware básico para parsear JSON
app.use(express.json());

 // Ruta de prueba
 app.get('/',(req,res)=>{
    res.send('Servidor levantado ✨💪')
 })



 app.get('/camion', async (req, res) => {
        try {
            const camion = await Camion.findAll();
            res.json(camion);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener camion' });
        }
    });
 // Iniciar servidor y probar conexión DB
 async function startServer(){
    try{
        await sequelize.authenticate();
        console.log('Conexión a la Bd establecida✨💪');
        // Sincroniza modelos (más sobre esto en el Paso 3)
        await sequelize.sync({ force: false });
        console.log('🔄 Modelos sincronizados con la base de datos.');

        // Inicia el servidor Express
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
          });
    }catch(error){
        console.error('Error de conexión ❌',error)
    }
 }
 
 startServer();