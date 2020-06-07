/* eslint-disable no-plusplus */
/* eslint-disable no-unused-expressions */
const counterRepository = require('../repositories/counter.repo')

const GROUPS = Object.freeze({ START: 1, END: 11 })

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
  const iterator = await getIterator(type)
  try {
    if (typeof (iterator) !== 'number') throw Error

    if (iterator < GROUPS.END) {
      const nextGroup = iterator + 1
      await counterRepository.update({ _id: getCounterId(type) }, { iterator: nextGroup })
      return nextGroup
    }

    await counterRepository.update({ _id: getCounterId(type) }, { iterator: GROUPS.START })

    return GROUPS.START
  } catch (error) {
    return console.error(error)
  }
}

async function futureIterator() {
  return {
    weekday: await getIterator('weekday'),
    saturday: await getIterator('saturday'),
    sunday: await getIterator('sunday'),
    updateCounter(type) {
      this[type]++
      this[type] > GROUPS.END ? this[type] = GROUPS.START : null
    },
  }
}

module.exports = { futureIterator, updateCounter, getCounterId }
