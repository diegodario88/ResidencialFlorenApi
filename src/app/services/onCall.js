const oncallRepository = require('../repositories/oncall.repo')
const counterRepository = require('../repositories/counter.repo')
const { checkScaleType } = require('../utils/scale.utils')
const { currentDateFormated, findCurrentDayOfWeek, currentDate } = require('../utils/date.utils')

const getCounter = (type) => ({
  weekday: '5eb58959386f6e1128aec310',
  saturday: '5eb58a08386f6e1128aec311',
  sunday: '5eb58a3a386f6e1128aec312',
}[type] || 'ID not found')

const getIterator = async (type) => {
  try {
    const { iterator } = {
      weekday: await counterRepository.findById(getCounter('weekDay')),
      saturday: await counterRepository.findById(getCounter('saturday')),
      sunday: await counterRepository.findById(getCounter('sunday')),
    }[type]

    return iterator
  } catch (error) {
    return {
      err: ' Cannot find type',
    }
  }
}

const updateCounter = async (type) => {
  const Enum = Object.freeze({ startGroup: 1, endGroup: 13 })
  const iterator = await getIterator(type)

  try {
    if (iterator < Enum.endGroup) {
      const nextGroup = iterator + 1
      await counterRepository.update({ _id: getCounter(type) }, { iterator: nextGroup })
      return nextGroup
    }

    await counterRepository.update({ _id: getCounter(type) }, { iterator: Enum.startGroup })

    return Enum.startGroup
  } catch (error) {
    return {
      err: 'Cannot update counter with your type',
    }
  }
}

const reportUpdate = (prev, next) => console.log(`
🤖 Updating data
Date: ${currentDateFormated} 
Scale: ${findCurrentDayOfWeek}
_____________
⏮ Previous: ${prev.name}
⏭ Next: ${next.name}
`)

const onCallUpdater = async (prev, next) => {
  reportUpdate(prev, next)

  try {
    const resPrev = await oncallRepository.update(
      { _id: prev._id }, { [`${findCurrentDayOfWeek}.status`]: false },
    ) // updates prev

    const resNext = await oncallRepository.update({ _id: next._id }, {
      [`${findCurrentDayOfWeek}.date`]: currentDate.utcOffset('-03:00'),
      [`${findCurrentDayOfWeek}.status`]: true,
    }) // updates next

    const isUpdated = resPrev.ok && resNext.ok

    if (isUpdated) {
      return console.log(`Updated Groups: ${prev.name} ↔️ ${next.name} successfully  ✅`)
    }
    throw new Error('⛔️ Updating groups did not return 🆗')
  } catch (error) {
    console.error(error)
  }
}

const getNextGroup = async (currentOnCall) => {
  try {
    const scaleType = checkScaleType(currentDate)
    const nextGroup = await oncallRepository
      .getByNumber(await updateCounter(scaleType))

    // eslint-disable-next-line no-unused-expressions
    nextGroup !== undefined
      ? onCallUpdater(currentOnCall, nextGroup)
      : console.error('Next Group is undefined')
  } catch (err) {
    console.error('Ups! Something went wrong in nextGroup service', err)
  }
}

const getCurrentGroup = () => oncallRepository.getByStatus(findCurrentDayOfWeek)

module.exports = { getNextGroup, getCurrentGroup, getIterator }
