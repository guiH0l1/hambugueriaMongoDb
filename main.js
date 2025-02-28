const { conectar, desconectar } = require('./database.js')

const lanchesModel = require('./src/models/lanches.js')

const stringSimilarity = require('string-similarity')



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

const atualizarLanche = async (id, nomeLan, descLan, precoLan) => {
    try {
        const lanche = await lanchesModel.findByIdAndUpdate(
            id,
            {
                nome: nomeLan,          // Corrigido de nomeLanche para nome
                descricao: descLan,      // Corrigido de descLanche para descricao
                preco: precoLan         // Corrigido de precoLanche para preco
            },
            {
                new: true,
                runValidators: true
            }
        )
        // Validação (retorno do banco)
        if (!lanche) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Lanche atualizado com sucesso:", lanche)
        }
    } catch (error) {
        console.log(error)
    }
}

const buscarLanche = async (nome) => {
    try {
        // Buscar lanches cujo nome seja similar ao nome fornecido
        const lanche = await lanchesModel.find(
            {
                nome: new RegExp(nome, 'i') // Corrigido de nomeLanche para nome
            }
        )
        // Calcular a similaridade entre os nomes retornados e o nome pesquisado
        const nomesLanches = lanche.map(lanche => lanche.nome) // Corrigido de nomeLanche para nome
        // Validação (se não existir o lanche pesquisado)
        if (nomesLanches.length === 0) {
            console.log("Lanche não catalogado")
        } else {
            const match = stringSimilarity.findBestMatch(nome, nomesLanches)

            // Lanche com melhor similaridade
            const melhorLanche = lanche.find(lanche => lanche.nome === match.bestMatch.target) // Corrigido de nomeLanche para nome

            // Formatação da data
            const lancheFormatado = {
                nome: melhorLanche.nome,         // Corrigido de nomeLanche para nome
                descricao: melhorLanche.descricao, // Corrigido de descLanche para descricao
                preco: melhorLanche.preco        // Corrigido de precoLanche para preco
            }
            console.log(lancheFormatado)
        }

    } catch (error) {
        console.log(error)
    }
}

const deletarLanche = async (id) => {
    try {
        //a linha abaixo exclui o cliente 
        const lanche = await lanchesModel.findByIdAndDelete(id)
        //validação
        if (!lanche) {
            console.log("Lanche não encontrado")
        } else {
            console.log("Lanche deletado.")
        }
    } catch (error) {
        console.log(error)
    }

}


const app = async () => {
    await conectar()
    //await criarLanche('cachorro-quente', 'pão, salsicha, molho de tomate, ketchup, mostarda, pure', 'R$15,00')

    //await atualizarLanche('67c0e2b819915f4534590658', 'Pastel de carne', 'hambúrgueres, cheddar, bacon crocante, alface, cebola caramelizada', 'R$5,00')
    //await deletarLanche('67c0e2b819915f4534590658')
    //await listarLanche()
    await buscarLanche("Fish Burger")
    await desconectar()
}


console.clear()
app()
