const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const middlewares = require('./middlewares')
const routes = require('./app/controllers/routes')
require('dotenv').config()
require('./app/services/date')

function normalizePort(val) {
  const port = parseInt(val, 10)

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) return val

  if (port >= 0) return port

  return false
}

const app = express()
app.enable('trust proxy') // needed for rate limiting by Client IP
const port = normalizePort(process.env.PORT || 1337)

app.use(morgan('common'))
app.use(helmet())
app.use(cors())
app.use(routes.limiter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port, () => console.log(`ResidencialFloren-Api em execução... port:${port} recebendo requisições.`))

app.get('/', (req, res) => {
  res.status(200).send({
    title: 'Florence - Api',
    description: 'Fornece informações sobre as farmácias de plantão',
    mainRoute: '/api/v1/plantoes/atual',
    version: '1.1.0',
    author: 'Diego Dario',
  })
})

app.use('/api/v1', routes.router)
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)
