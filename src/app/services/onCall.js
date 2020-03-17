/* eslint-disable no-unused-expressions */
const moment = require('moment')
const Repository = require('../repositories/onCall')
const CounterRepository = require('../repositories/counter')

function getCounter(type) {
  return (
    {
      weekDay: '5e06e91a1c9d440000ad44f0',
      saturday: '5e06e9571c9d440000ad44f1',
      sunday: '5e06e97d1c9d440000ad44f2',
    }[type] || 'ID not found'
  )
}

async function getIterator(type) {
  try {
    const { iterador } = {
      weekDay: await CounterRepository.findById(getCounter('weekDay')),
      saturday: await CounterRepository.findById(getCounter('saturday')),
      sunday: await CounterRepository.findById(getCounter('sunday')),
    }[type]

    return iterador
  } catch (error) {
    return { err: ' Cannot find type' }
  }
}

async function updateCounter(type) {
  const Enum = Object.freeze({ startGroup: 1, endGroup: 13 })
  const iterator = await getIterator(type)
  try {
    if (iterator < Enum.endGroup) {
      const nextGroup = iterator + 1
      await CounterRepository.updateCounter(
        { _id: getCounter(type) },
        { iterador: nextGroup },
      )
      return nextGroup
    }
    await CounterRepository.updateCounter(
      { _id: getCounter(type) },
      { iterador: Enum.startGroup },
    )
    return Enum.startGroup
  } catch (error) {
    return { err: 'Cannot update counter with your type' }
  }
}

async function updateGroupData(plantaoAnterior, plantaoAtual, escala) {
  try {
    const date = moment().utcOffset('-03:00')
    console.log(`
            Atualizando dados --> 
            Data: ${date.format('DD/MM/YYYY')} 
            Escala: ${escala}
            _____________
            Plantão anterior: ${plantaoAnterior.name}
            Plantão atual: ${plantaoAtual.name}
            `)

    switch (escala) {
    case 1:
      await Repository.updateOnCall(
        { _id: plantaoAnterior._id },
        { statusSemanal: false },
      )
      await Repository.updateOnCall(
        { _id: plantaoAtual._id },
        { escalaSemanal: date, statusSemanal: true },
      )
      break

    case 2:
      await Repository.updateOnCall(
        { _id: plantaoAnterior._id },
        { statusSabado: false },
      )
      await Repository.updateOnCall(
        { _id: plantaoAtual._id },
        { escalaSabado: date, statusSabado: true },
      )
      break

    case 3:
      await Repository.updateOnCall(
        { _id: plantaoAnterior._id },
        { statusDomingo: false },
      )
      await Repository.updateOnCall(
        { _id: plantaoAtual._id },
        { escalaDomingo: date, statusDomingo: true },
      )
      break

    default:
      return
    }
  } catch (err) {
    console.error(err)
  }
}

exports.getNextGroup = async function getNextGroups(escala, plantaoAtual) {
  try {
    let nextGroup = null

    switch (escala) {
    case 1:
      // WeekDay
      nextGroup = await Repository.getByNumber(
        await updateCounter('weekDay'),
      )
      break

    case 2:
      // Saturday
      nextGroup = await Repository.getByNumber(
        await updateCounter('saturday'),
      )
      break

    case 3:
      // Sunday
      nextGroup = await Repository.getByNumber(await updateCounter('sunday'))
      break

    default:
      return
    }

    nextGroup !== undefined
      ? updateGroupData(plantaoAtual, nextGroup, escala)
      : console.error('Next Group is undefined')
  } catch (err) {
    console.error('Ups! Something went wrong in nextGroup service', err)
  }
}

exports.getCurrentGroup = () => {
  const dia = moment()
    .utcOffset('-03:00')
    .day()
  const sabado = 6
  const domingo = 0

  if (dia > domingo && dia < sabado) return Repository.getByStatus('Semanal')

  if (dia === sabado) return Repository.getByStatus('Sabado')

  return Repository.getByStatus('Domingo')
}
