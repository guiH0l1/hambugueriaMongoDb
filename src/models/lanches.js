const  {model, Schema} = require('mongoose')


const lancheSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String, required: true },
  preco: { type: String, required: true }
},{ versionKey: false}
)
 
module.exports = model('lanches', lancheSchema)