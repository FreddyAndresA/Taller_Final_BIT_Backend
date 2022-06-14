const userController = require('../controllers/UserController')
const Router = require('express')
const router = Router()


// Ruta principal
router.get('api/', userController.verifyToken, (req, res) => res.send('Hello World !'))


// Ruta para registrarse verbo POST -- /signup
router.post('/signup', userController.signUp)


// Ruta para iniciar sesion verbo POST -- /signin
router.post('/signin', userController.signIn)


/* 
Probando la ruta para la busqueda a traves de endpoint en el index.js:
app.use('/api', require('./routes/router')) 


Probando la ruta para la busqueda a traves de endpoint en el enrutador
router.get('/api/probando', (req, res) => {
    res.send('Pagina de prueba de API')
})
*/


module.exports = router

