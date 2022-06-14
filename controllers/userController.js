const User = require('../models/User')
const jwt = require('jsonwebtoken')


//------------------------------------------------------------------------Verificacion del token
exports.verifyToken = (req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).send("Por favor inicia sesion !")
    }

    const token = req.headers.authorization.split(' ')[1]
    if(token === null) {
        return res.status(401).send("Por favor inicia sesion !")
    }

    const payload = jwt.verifytoken(token, 'secreyKey')
    req.userId = payload._id

    next()
}


//------------------------------------------------------------------------Registrarse
exports.signUp = async (req, res) => {
    try {
        //res.send('Pagina de registro')
        const { email, password, nombre, generoFavorito } = req.body
        const newUser = new User ({ email: email, password: password, nombre: nombre, generoFavorito: generoFavorito })
        await newUser.save();
        
        //Creacion del token
        const token = jwt.sign( { _id: newUser._id } , 'secretkey')
        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send('Ups... hubo un error')
    }
    
}

//------------------------------------------------------------------------Iniciar sesion
exports.signIn = async (req, res) => {
    try {
        //res.send('Pagina de inicio de sesion')
        const { email, password } = req.body
        const user = await User.findOne({ email })
        
        if(!user) {
            return res.status(401).send('El correo no existe !')
        }
        if(user.password !== password) {
            return res.status(401).send('La contraseña no es valida !')
        }
        //Creacion del token
        const token = jwt.sign( { _id: user._id } , 'secretkey')
        res.status(200).json({ token })
    } catch (error) {
        console.log(error)
        res.status(500).send('Ups... hubo un error')
    }
}