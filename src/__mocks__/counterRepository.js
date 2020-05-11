/* eslint-disable no-undef */
export default {
  findById: jest.fn(() => Promise.resolve({ iterator: 4, date: '2020-05-09' })),
}
