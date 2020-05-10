const moment = require('moment')
const { checkScaleType } = require('../utils/scale.utils')

// Date utilities to avoid circular dependencies.
const monthsPtBr = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]


const currentDateFormated = (() => moment()
  .utcOffset('-03:00').format('DD/MM/YYYY - H:mm:ss A'))()

const currentDate = (() => moment()
  .utcOffset('-03:00'))()

const currentDayOfWeek = (() => moment().utcOffset('-03:00').day())()

const yesterdayDayOfWeek = (() => moment().subtract(1, 'day').utcOffset('-03:00').day())()

const findCurrentDayOfWeek = (() => {
  const whichType = Object.freeze({
    weekday: 'weekday',
    saturday: 'saturday',
    sunday: 'sunday',
  })
  const type = checkScaleType(currentDayOfWeek)
  return whichType[type]
})()

module.exports = {
  currentDateFormated,
  currentDate,
  yesterdayDayOfWeek,
  findCurrentDayOfWeek,
  monthsPtBr,
}
