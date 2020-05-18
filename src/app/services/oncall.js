const oncallRepository = require('../repositories/oncall.repo')
const counterRepository = require('../repositories/counter.repo')
const { checkScaleType } = require('../utils/scale.utils')
const { currentDateFormated, currentDate, currentDayOfWeek } = require('../utils/date.utils')

const getCounterId = (type) => ({
  weekday: '5eb58959386f6e1128aec310',
  saturday: '5eb58a08386f6e1128aec311',
  sunday: '5eb58a3a386f6e1128aec312',
}[type] || 'ID not found')

const getIterator = async (type) => {
  try {
    const { iterator } = await {
      weekday: async () => counterRepository.findById(getCounterId('weekday')),
      saturday: async () => counterRepository.findById(getCounterId('saturday')),
      sunday: async () => counterRepository.findById(getCounterId('sunday')),
    }[type]()

    return iterator
  } catch (error) {
    return console.error(`Cannot find iterator with type: ${type}`, error)
  }
}

const updateCounter = async (type) => {
  const Enum = Object.freeze({ startGroup: 1, endGroup: 13 })
  const iterator = await getIterator(type)
  try {
    if (typeof (iterator) !== 'number') throw Error

    if (iterator < Enum.endGroup) {
      const nextGroup = iterator + 1
      await counterRepository.update({ _id: getCounterId(type) }, { iterator: nextGroup })
      return nextGroup
    }

    await counterRepository.update({ _id: getCounterId(type) }, { iterator: Enum.startGroup })

    return Enum.startGroup
  } catch (error) {
    return console.error(error)
  }
}

const reportUpdate = (prev, next) => console.log(`
🤖 Updating data
Date: ${currentDateFormated()} 
Scale: ${checkScaleType(currentDayOfWeek())}
_____________
⏮ Previous: ${prev.name}
⏭ Next: ${next.name}
`)

const onCallUpdater = async (prev, next) => {
  reportUpdate(prev, next)

  try {
    const resPrev = await oncallRepository.update(
      { _id: prev._id }, { [`${checkScaleType(currentDayOfWeek())}.status`]: false },
    )

    const resNext = await oncallRepository.update({ _id: next._id }, {
      [`${checkScaleType(currentDayOfWeek())}.date`]: currentDate().utcOffset('-03:00'),
      [`${checkScaleType(currentDayOfWeek())}.status`]: true,
    })

    const isUpdated = !!(resPrev.ok && resNext.ok)

    if (isUpdated) {
      return console
        .log(`Updated Groups: ${prev.name} ↔️  ${next.name} successfully  ✅`)
    }

    throw new Error('⛔️ Updating groups did not return 🆗')
  } catch (error) {
    return console.error(error)
  }
}

const getNextGroup = async (currentOnCall) => {
  try {
    const nextGroup = await oncallRepository
      .getByNumber(await updateCounter(checkScaleType(currentDayOfWeek())))

    // eslint-disable-next-line no-unused-expressions
    nextGroup !== undefined
      ? onCallUpdater(currentOnCall, nextGroup)
      : console.error('Next Group is undefined')
  } catch (err) {
    console.error('Ups! Something went wrong in nextGroup service', err)
  }
}

const getCurrentGroup = () => oncallRepository.getByStatus(checkScaleType(currentDayOfWeek()))

module.exports = {
  getNextGroup, getCurrentGroup, getIterator, getCounterId,
}
