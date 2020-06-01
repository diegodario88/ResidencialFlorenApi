const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const openApiDocumentation = require('./docs/openApiDocumentation')

const middlewares = require('./middlewares')
const routesV2 = require('./routes')
require('dotenv').config()
require('./app/services/changer')

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
app.use(routesV2.limiter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.listen(port, () => console.log(`FlorenceAPI running on port:${port}`))
app.use('/api/v2', routesV2.router)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.use('/', swaggerUi.serve, swaggerUi.setup(openApiDocumentation))
