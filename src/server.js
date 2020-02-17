const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

function normalizePort(val) {
  const port = parseInt(val, 10)

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

const app = express()
const port = normalizePort(process.env.PORT || '3000')
const router = express.Router()

app.use(helmet)
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// eslint-disable-next-line no-unused-vars
const route = router.get('/', (req, res, next) => {
  res.status(200).send({
    title: 'ResidencialFloren - Api',
    description: 'Fornece informações sobre as farmácias de plantão',
    route: '/api/v1/plantoes/atual',
    version: '1.0.0',
    author: 'Diego Dario',
  })
})

require('./app/controllers/farmaciaController')(app)
require('./app/controllers/plantaoController')(app)
require('./app/services/dataService')


app.listen(port)
app.use('/', route)
console.log(`ResidencialFloren-Api em execução... port:${port} recebendo requisições.`)
