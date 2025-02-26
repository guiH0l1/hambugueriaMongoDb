const mongoose = require('mongoose')

const url = 'mongodb+srv://admin:123Senac@atlas.vhu62.mongodb.net/dblanches'

let conectado = false

// metodo para conectar com o banco de dados
const conectar = async () => {
    // se não estiver conectado
    if (!conectado) {
        // conectar com o banco de dados
        try {
            await mongoose.connect(url)
            conectado = true
            console.log("MondoDB Conectado")
        } catch (error) {
            console.log(error)
        }
    }
}
 
// metodo para desconectar o banco de dados
const desconectar = async () => {
    // se estiver conectado
    if (conectado) {
        // desconectar
        try {
            await mongoose.disconnect(url) // desconectar
            conectado = false
            console.log("MongoDB Desconectado")
        } catch (error) {
            console.log(error)
        }
    }
}
 
// Exportar para o main os metodos conectar e desconectar
module.exports = { conectar, desconectar }