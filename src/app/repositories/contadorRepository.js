const Contador = require('../models/contador')

// Encontra o contador pelo tipo
exports.findById = async (id) => {
  try {
    const result = await Contador.findOne({ _id: id })
    return result
  } catch (err) {
    return {
      error: 'Errei aqui. Não consegui encontrar nenhum contador pelo id.',
    }
  }
}

// Atualiza o contador
exports.updateCounter = async (filter, update) => {
  try {
    await Contador.updateOne(filter, update)

    return console.warn('Counter updated succefully')
  } catch (err) {
    console.log(err)
    return { error: 'Something went wrong in updateCounter' }
  }
}
