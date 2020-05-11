/* eslint-disable brace-style */
const cron = require('node-cron')
const moment = require('moment')
const oncallRepository = require('../repositories/oncall.repo')
const twitterService = require('./twitter')
const printService = require('./printScreen')
const { getNextGroup } = require('./onCall')
const { checkScaleType } = require('../utils/scale.utils')
const { currentDate, currentDateFormated, currentDayOfWeek } = require('../utils/date.utils')

const handleDateChange = async () => {
  try {
    const currentOnCall = await oncallRepository.getByStatus(checkScaleType(currentDayOfWeek))
    const { [checkScaleType(currentDayOfWeek)]: { date } } = currentOnCall

    const onCallPreviousDate = moment(date)
    const isNextYear = currentDate.year() > onCallPreviousDate.year()
    const isNextDay = currentDate.dayOfYear() > onCallPreviousDate.dayOfYear()

    if (isNextYear || isNextDay) {
      console
        .info(`Date has been changed to ${currentDateFormated}. Calling updater ↩️`)
      getNextGroup(currentOnCall)
    }
  } catch (error) {
    console.error(error)
  }
}

cron.schedule('0 18 * * *', async () => {
  await printService.printScreen()
  await twitterService.makeTweet()
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
})

cron.schedule('* * * * *', () => {
  console.warn('Looking for date changes ⏰')
  handleDateChange()
}, {
  scheduled: true,
  timezone: 'America/Sao_Paulo',
})
