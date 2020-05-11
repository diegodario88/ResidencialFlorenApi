/* eslint-disable no-undef */
const { getCounterId, getIterator } = require('../services/onCall')

describe('Get Counters by type', () => {
  test('gets counter Id based on a weekday type', () => {
    expect(getCounterId('weekday')).toBe('5eb58959386f6e1128aec310')
  })
  test('gets counter Id based on a saturday type', () => {
    expect(getCounterId('saturday')).toBe('5eb58a08386f6e1128aec311')
  })
  test('gets counter Id based on a sunday type', () => {
    expect(getCounterId('sunday')).toBe('5eb58a3a386f6e1128aec312')
  })
})

describe('Get current iterator', () => {
  expect.assertions(1)
  test('the data today must be 4', async () => {
    const data = await getIterator('weekday')
    expect(data).toBe(4)
  })
})
