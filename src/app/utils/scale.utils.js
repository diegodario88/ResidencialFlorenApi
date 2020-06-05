const saturday = 6
const sunday = 0

const checkScaleType = (day) => {
  if ((day > sunday) && (day < saturday)) return 'weekday'
  if (day === saturday) return 'saturday'
  return 'sunday'
}

const isEmpty = (obj) => {
  const isNullOrUndefined = obj === null || obj === undefined
  if (isNullOrUndefined) return true
  return Object.keys(obj).length === 0
}

const selfsameMonth = (obj, month) => Object.prototype.hasOwnProperty.call(obj, month)

module.exports = { checkScaleType, isEmpty, selfsameMonth }
