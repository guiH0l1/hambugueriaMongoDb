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

const listarLanche = async () => {
    try {
        // a linha abaixo lista todos os clientes cadastrados em ordem alfabética
        const lanche = await lanchesModel.find().sort(
            {
                nomeLanche: 1
            }
        )
        console.log(lanche)
    } catch (error) {
        console.log(error)
    }
}

const buscarLanche = async (nome) => {
    try {
        // find() -> buscar 
        // nomeCliente: new RegExp(nome) filtro pelo nome (partes que contenham (expressão regular))
        // 'i' insentive (ignorar letras maiusculas e minusculas)
        const lanche = await lanchesModel.find({ nomeLanche: new RegExp(nome, 'i') }
        )
        //calcular a similaridade entre os nomes retornados e o nome pesquisado
        const nomeLanche = lanche.map(lanche => lanche.nomeLanche)

        if (nomeLanche.length === 0) {
            console.log("Lanche não cadastrado")
        } else {
            const match = stringSimilarity.findBestMatch(nome,
                nomeLanche)
            //lanche com melhor similaridade
            const melhorLanche = lanche.find(lanche => lanche.nomeLanche === match.bestMatch.target)
            //formatação da data
            const lancheFormatado = {
                nomeLanche: melhorLanche.nomeLanche,
                descricaoLanche: melhorLanche.descricaoLanche,
                preco: melhorLanche.preco,
                dataCadastro: melhorLanche.dataCadastro.toLocaleDateString('pt-BR')
            }
            console.log(lancheFormatado)
            //console.log(melhorCliente)
        }



    } catch (error) {
        console.log(error)
    }
}



const app = async () => {
    await conectar()
    //await criarLanche('cachorro-quente', 'pão, salsicha, molho de tomate, ketchup, mostarda, pure', 'R$15,00')
    //await listarLanche()
    await buscarLanche("heddar Bacon")
    await desconectar()
    

}

console.clear()
app()
