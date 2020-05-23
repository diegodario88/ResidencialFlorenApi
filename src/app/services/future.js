/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
const moment = require('moment')
const Repository = require('../repositories/oncall.repo')
const { getIterator } = require('./oncall')
const { currentDate, monthsPtBr } = require('../utils/date.utils')
const { checkScaleType } = require('../utils/scale.utils')

const futureGroups = []

const onCallList = async () => {
  const list = await Repository.getAll()
  return list.sort((a, b) => a.number - b.number)
}

const getFutureOnCallByPeriod = async (firstDate, secondDate) => {
  try {
    const firstMoment = moment(firstDate).startOf('day')
    const secondMoment = moment(secondDate).endOf('month')
    const dayWeekFirstMoment = firstMoment.day()
    const isFuture = firstMoment.isAfter(currentDate().startOf('day')) && secondMoment.isAfter(currentDate())
    const groups = await onCallList()
    const futureIterator = {
      weekday: await getIterator('weekday'),
      saturday: await getIterator('saturday'),
      sunday: await getIterator('sunday'),
      updateCounter: (type) => {
        futureIterator[type]++
        futureIterator[type] > 13 ? futureIterator[type] = 1 : null
      },
    }

    if (isFuture) {
      const daysToIterate = firstMoment.diff(moment().startOf('day'), 'days')
      for (let index = 1; index <= daysToIterate; index++) {
        const dateTomorrow = moment().add(index, 'day').utcOffset('-03:00')
        const dayWeek = dateTomorrow.day()
        futureIterator.updateCounter(checkScaleType(dayWeek))
      }

      const makeObjToPushOnList = (date, dayWeek) => ({
        [monthsPtBr[date.month()]]: [{
          day: date.format('YYYY-MM-DD'),
          pharmacies: groups[futureIterator[
            checkScaleType(dayWeek)] - 1].pharmacies,
          group: groups[futureIterator[
            checkScaleType(dayWeek)] - 1].name,
        }],
      })
      // push the first group based on a type of iterator

      futureGroups.push(makeObjToPushOnList(firstMoment, dayWeekFirstMoment))

      const daysToIterateFromSecondDate = secondMoment.diff(firstMoment, 'days')

      for (let index = 1; index <= daysToIterateFromSecondDate; index++) {
        const dateTomorrow = moment(firstMoment).add(index, 'day')
        const dayWeek = dateTomorrow.day()
        const month = monthsPtBr[dateTomorrow.month()]
        const listIndex = (futureGroups.length - 1)
        futureIterator.updateCounter(checkScaleType(dayWeek))
        // eslint-disable-next-line no-prototype-builtins
        if (futureGroups[listIndex].hasOwnProperty(month)) {
          futureGroups[listIndex][month].push({
            day: dateTomorrow.format('YYYY-MM-DD'),
            pharmacies: groups[futureIterator[
              checkScaleType(dayWeek)] - 1].pharmacies,
            group: groups[futureIterator[
              checkScaleType(dayWeek)] - 1].name,
            // push rest groups based on a type of iterator
          })
        } else {
          futureGroups.push(makeObjToPushOnList(dateTomorrow, dayWeek))
        }
      }
      return futureGroups
    }
    throw new Error(
      `Problem with your dates: ${firstDate} or ${secondDate},
        🤔 maybe they are not after ${currentDate().format('YYYY-MM-DD')}`,
    )
  } catch (error) {
    return console.error(error.message, error)
  }
}

module.exports = {
  getFutureOnCallByPeriod,
}
