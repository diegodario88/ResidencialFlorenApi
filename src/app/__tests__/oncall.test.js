/* eslint-disable no-undef */
const { getCounterId } = require('../services/oncall')

describe('Get Counters by type', () => {
  test('gets counter Id based on a weekday type', async () => {
    await expect(getCounterId('weekday')).toBe('5eb58959386f6e1128aec310')
  })
  test('gets counter Id based on a saturday type', async () => {
    await expect(getCounterId('saturday')).toBe('5eb58a08386f6e1128aec311')
  })
  test('gets counter Id based on a sunday type', async () => {
    await expect(getCounterId('sunday')).toBe('5eb58a3a386f6e1128aec312')
  })
})
