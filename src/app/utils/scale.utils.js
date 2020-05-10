const saturday = 6
const sunday = 0

const checkScaleType = (day) => {
  if ((day > sunday) && (day < saturday)) return 'weekday'
  if (day === saturday) return 'saturday'
  return 'sunday'
}

const findScaleDate = (dates, day) => {
  const whichDate = Object.freeze({
    weekDay: dates[0],
    saturday: dates[1],
    sunday: dates[2],
  })
  const type = checkScaleType(day)
  return whichDate[type]
}

const isEmpty = (obj) => {
  const isNullOrUndefined = obj === null || obj === undefined
  if (isNullOrUndefined) return true
  return Object.keys(obj).length === 0
}

module.exports = { checkScaleType, findScaleDate, isEmpty }
