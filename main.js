const { conectar, desconectar } = require('./database.js')

const lanchesModel = require('./src/models/lanches.js')


 
// CRUD Create (função para adicionar um novo cliente)
const criarLanche = async (nomeLan, descLan, precoLan) => {
    try {
        const novoLanche = new lanchesModel(
            {
                nome: nomeLan,
                descricao: descLan,
                preco: precoLan
                
            }
        )
        await novoLanche.save()
        console.log("Lanche adicionado com sucesso")

    } catch (error) {
        console.log(error)
    }
}

const app = async () => {
    await conectar()
    await criarLanche('Big Mac', '4 hamb, alface, cebola, tomate e pão', 'R$20,00')
    await desconectar()

}

console.clear()
app()
