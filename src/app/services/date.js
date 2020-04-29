/* eslint-disable brace-style */
const moment = require('moment')
const cron = require('node-cron')
const Repository = require('../repositories/onCall')
const plantaoService = require('./onCall')
const twitterService = require('./twitter')
const printService = require('./printScreen')


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
      .getNextGroups(EscalaEnum, plantaoAtual)
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

cron.schedule('0 18 * * *', async () => {
  await printService.printScreen()
  await twitterService.makeTweet()
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
})

cron.schedule('0 0 * * *', () => {
  console.warn(`Monitorando --> 
    Data atual: ${moment()
    .utcOffset('-03:00')
    .format('DD/MM/YYYY - H:mm:ss A')}`)
  const diaAtual = moment().utcOffset('-03:00')
  monitorThread(diaAtual).catch(console.warn)
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
})

module.exports = { monitorThread }
