const express = require('express')


// Conexion a la BD
const conectarDB = require('./config/db')
conectarDB()



// Creamos el servidor
const app = express();

app.listen(4000, () => {
    console.log("----------- Estado del servidor: ARRIBA y CORRIENDO !")
})


// Configuracion del Middleware
app.use(express.json());


// Enrutado en la pagina raiz
app.use('/', require('./routes/router'))


// Definimos ruta principal
/* 
app.get('/', (req, res) => {
    res.send('Hola Mundo !')
}) 
*/


// Error de CORS
const cors = require('cors')
app.use(cors())