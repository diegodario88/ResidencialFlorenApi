/* eslint-disable no-plusplus */
const moment = require('moment')
const Repository = require('../repositories/oncall.repo')
const { futureIterator } = require('./counter')
const { currentDate, monthsPtBr } = require('../utils/date.utils')
const { checkScaleType, selfsameMoth } = require('../utils/scale.utils')


const getFutureOnCallByPeriod = async (firstDate, secondDate) => {
  const futureGroups = []
  try {
    const firstMoment = moment(firstDate).startOf('day')
    const secondMoment = moment(secondDate).endOf('month')
    const dayWeekFirstMoment = firstMoment.day()
    const firstMomentIterator = firstMoment.diff(moment().utcOffset('-03:00').startOf('day'), 'days')
    const secondMomentIterator = secondMoment.diff(firstMoment, 'days')
    const isFuture = firstMoment
      .isAfter(currentDate().startOf('day')) && secondMoment.isAfter(firstMoment)

    if (isFuture) {
      const groups = await Repository.getAll()
      const iterator = await futureIterator()

      for (let index = 1; index <= firstMomentIterator; index++) {
        const dayWeekTomorrow = moment()
          .utcOffset('-03:00')
          .add(index, 'day')
          .day()
        iterator.updateCounter(checkScaleType(dayWeekTomorrow))
      }

      const groupMaker = (date, dayWeek) => ({
        [monthsPtBr[date.month()]]: [{
          day: date.format('YYYY-MM-DD'),
          pharmacies: groups[iterator[
            checkScaleType(dayWeek)] - 1].pharmacies,
          group: groups[iterator[
            checkScaleType(dayWeek)] - 1].name,
        }],
      })
      // push the first group based on a type of iterator

      futureGroups.push(groupMaker(firstMoment, dayWeekFirstMoment))


      for (let index = 1; index <= secondMomentIterator; index++) {
        const dateTomorrow = moment(firstDate)
          .utcOffset('-03:00')
          .add(index, 'day')
        const dayWeek = dateTomorrow.day()
        const month = monthsPtBr[dateTomorrow.month()]
        const listIndex = (futureGroups.length - 1)

        iterator.updateCounter(checkScaleType(dayWeek))

        if (selfsameMoth(futureGroups[listIndex], month)) {
          futureGroups[listIndex][month].push({
            day: dateTomorrow.format('YYYY-MM-DD'),
            pharmacies: groups[iterator[
              checkScaleType(dayWeek)] - 1].pharmacies,
            group: groups[iterator[
              checkScaleType(dayWeek)] - 1].name,
            // push rest groups based on a type of iterator
          })
        } else {
          futureGroups.push(groupMaker(dateTomorrow, dayWeek))
        }
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
