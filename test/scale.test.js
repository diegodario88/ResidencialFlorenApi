const { describe, it } = require('mocha')
const { expect } = require('chai')
const { selfsameMoth } = require('../src/app/utils/scale.utils')

const month = 'Junho'

const futureList = [{
  Junho: [
    {
      day: '2020-06-29',
      pharmacies: [
        {
          location: {
            lat: -22.9310219,
            lng: -53.1360459,
          },
          _id: '5eb6bfb38dd05d198c3449df',
          name: 'Farm\u00e1cia Rede L\u00edder',
          phone: '(44) 3425-5200',
          address: 'Av.Paran\u00e1, 1165 - Centro',
        },
        {
          location: {
            lat: -22.9302177,
            lng: -53.1355451,
          },
          _id: '5eb6bfb38dd05d198c3449de',
          name: 'Farm\u00e1cia Farma \u00datil',
          phone: '(44) 3425-2539',
          address: 'Av.Gov.Munhoz da Rocha, 1558 - Centro',
        },
      ],
      group: 'G12',
    },
    {
      day: '2020-06-30',
      pharmacies: [
        {
          location: {
            lat: -22.9307991,
            lng: -53.1345022,
          },
          _id: '5eb6bfb38dd05d198c3449e0',
          name: 'Farm\u00e1cia Du Pre\u00e7o Popular',
          phone: '(44) 3425-2921',
          address: 'Rua Accioly Filho, 448 - Centro',
        },
        {
          location: {
            lat: -22.9307644,
            lng: -53.1361516,
          },
          _id: '5eb6bfb38dd05d198c3449e1',
          name: 'Farm\u00e1cia Pre\u00e7o Baixo',
          phone: '(44) 3425-1388',
          address: 'Avenida Paran\u00e1, 1198 - Centro',
        },
      ],
      group: 'G13',
    },
  ],
},
]


describe('Compare if a obj has property', () => {
  it('check for a property', async () => {
    expect(selfsameMoth(futureList[0], month)).to.equal(month)
  })
})
