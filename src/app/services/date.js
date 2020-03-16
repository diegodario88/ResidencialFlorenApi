/* eslint-disable brace-style */
const moment = require('moment')
const Repository = require('../repositories/onCall')
const plantaoService = require('./onCall')
const twitterService = require('./twitter')
const printService = require('./printScreen')

// Definindo o intervalo
const minutes = 120
const interval = minutes * 60 * 1000

const logInfo = (name, diaAtual) => {
  console.info(
    `O dia mudou para ${diaAtual.format(
      'DD/MM/YYYY',
    )}. Alteração do plantão em andamento...`,
  )
  console.info(`Plantão anterior: ${name} alterando para o próximo.`)
}

const checkDate = async (plantaoAtual, diaAtual, EscalaEnum, dataEscala) => {
  const diaPlantao = moment(dataEscala).utcOffset('-03:00')

  if (
    diaAtual.year() > diaPlantao.year()
    || diaAtual.dayOfYear() > diaPlantao.dayOfYear()
  ) {
    // Troca plantão
    logInfo(plantaoAtual.name, diaAtual)

    return plantaoService
      .getNextGroup(EscalaEnum, plantaoAtual)
  }

  if (diaAtual.hours() > 18 && diaAtual.hours() < 22) {
    await printService.printScreen()
    await twitterService.makeTweet()
  }
  return console.info(
    `Data do plantão: ${diaPlantao.format('DD/MM/YYYY - H:mm:ss A')}`,
  )
}

const monitorThread = async (diaAtual) => {
  const EscalaEnum = Object.freeze({ semanal: 1, sabadal: 2, domingal: 3 })
  let plantaoAtual = null
  const dia = diaAtual.day()
  const sabado = 6
  const domingo = 0

  // SEMANAL
  if (dia > domingo && dia < sabado) {
    plantaoAtual = await Repository.getByStatus('Semanal')
    const { escalaSemanal } = plantaoAtual
    checkDate(plantaoAtual, diaAtual, EscalaEnum.semanal, escalaSemanal)
  } // SABADAL
  else if (dia === sabado) {
    plantaoAtual = await Repository.getByStatus('Sabado')
    const { escalaSabado } = plantaoAtual
    checkDate(plantaoAtual, diaAtual, EscalaEnum.sabadal, escalaSabado)
  } // DOMINGAL
  else {
    plantaoAtual = await Repository.getByStatus('Domingo')
    const { escalaDomingo } = plantaoAtual
    checkDate(plantaoAtual, diaAtual, EscalaEnum.domingal, escalaDomingo)
  }
}

setInterval(() => {
  console.warn(`Monitorando --> 
    Data atual: ${moment()
    .utcOffset('-03:00')
    .format('DD/MM/YYYY - H:mm:ss A')}`)
  const diaAtual = moment().utcOffset('-03:00')
  monitorThread(diaAtual).catch(console.warn)
}, interval)


module.exports = { monitorThread }
