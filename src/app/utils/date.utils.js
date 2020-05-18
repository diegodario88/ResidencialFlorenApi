const moment = require('moment')

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


const currentDateFormated = () => moment()
  .utcOffset('-03:00').format('DD/MM/YYYY - H:mm:ss A')

const currentDate = () => moment()
  .utcOffset('-03:00')

const currentDateUTC = () => moment()
  .startOf('day')

const currentDayOfWeek = () => moment().utcOffset('-03:00').day()


module.exports = {
  currentDateFormated,
  currentDate,
  currentDayOfWeek,
  monthsPtBr,
  currentDateUTC,
}
