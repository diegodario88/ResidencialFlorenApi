/* eslint-disable no-undef */
const { describe, it } = require('mocha')
const { expect } = require('chai')
const { getCounterId } = require('../src/app/services/counter')

describe('Get Counters by type (unit)', () => {
  it('gets counter Id based on a weekday type', async () => {
    expect(getCounterId('weekday')).to.equal('5eb58959386f6e1128aec310')
    expect(getCounterId('saturday')).to.equal('5eb58a08386f6e1128aec311')
    expect(getCounterId('sunday')).to.equal('5eb58a3a386f6e1128aec312')
  })
})
