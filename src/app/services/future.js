const moment = require('moment')
const Repository = require('../repositories/oncall.repo')
const { futureIterator } = require('./counter')
const { currentDate, monthsPtBr } = require('../utils/date.utils')
const { checkScaleType, selfsameMonth } = require('../utils/scale.utils')

const getFutureOnCallByPeriod = async (firstDate, secondDate) => {
  const futureGroups = []
  try {
    const firstMoment = moment(firstDate).startOf('day')
    const secondMoment = moment(secondDate).endOf('month')
    const dayWeekFirstMoment = firstMoment.day()
    const today = moment.utc().subtract(3, 'h').startOf('day')
    const firstMomentIterator = firstMoment.diff(today, 'day')
    const secondMomentIterator = secondMoment.diff(firstMoment, 'day')
    const isFuture = firstMoment
      .isAfter(currentDate().utcOffset('-03:00')
        .startOf('day')) && secondMoment.isAfter(firstMoment)

    if (isFuture) {
      const groups = await Repository.getAll()
      const iterator = await futureIterator()

      for (let index = 1; index <= firstMomentIterator; index++) {
        const dayWeekTomorrow = moment.utc()
          .subtract(3, 'h')
          .startOf('day')
          .add(index, 'day')
          .day()

        iterator.updateCounter(checkScaleType(dayWeekTomorrow))
      }

      const objMaker = (date, dayWeek) => ({
        day: date.format('YYYY-MM-DD'),
        pharmacies: groups[iterator[
          checkScaleType(dayWeek)] - 1].pharmacies,
        group: groups[iterator[
          checkScaleType(dayWeek)] - 1].name,
      })

      const monthMaker = (arr, date, dayWeek) => arr.push({
        [monthsPtBr[date.month()]]: [objMaker(date, dayWeek)],
      })

      const groupPusher = (arr, date, dayWeek) => arr.push(objMaker(date, dayWeek))

      monthMaker(futureGroups, firstMoment, dayWeekFirstMoment)

      for (let index = 1; index <= secondMomentIterator; index++) {
        const dateTomorrow = moment(firstDate)
          .add(index, 'day')
        const dayWeek = dateTomorrow.day()
        const month = monthsPtBr[dateTomorrow.month()]
        const listIndex = (futureGroups.length - 1)

        iterator.updateCounter(checkScaleType(dayWeek))

        selfsameMonth(futureGroups[listIndex], month)
          ? groupPusher(futureGroups[listIndex][month], dateTomorrow, dayWeek)
          : monthMaker(futureGroups, dateTomorrow, dayWeek)
      }

      return futureGroups
    }
    throw new Error(
      `Problem with your dates: ${firstDate} or ${secondDate},
        🤔 maybe they are not after ${currentDate().format('YYYY-MM-DD')}`,
    )
  } catch (error) {
    return console.error(error.message)
  }
}

module.exports = {
  getFutureOnCallByPeriod,
}
