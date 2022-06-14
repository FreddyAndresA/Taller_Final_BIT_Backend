const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    nombre: String,
    generoFavorito: String
},
{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model("User", userSchema)