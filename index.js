import express from 'express'
import { logger } from './middleware/logEvents.js'
import { errorHandler } from './middleware/errorHandler.js'
import { rootRouter } from './routes/root.js'
import { employeesRouter } from './routes/api/employees.js'
import { registerRouter } from './routes/register.js'
import { authRouter } from './routes/auth.js'
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js'

//initialize app with express
const app = express()

//initial __dirname, __filename in @ES6 module
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 6996

//custom middleware logger
app.use(logger)

// Cross Origin Resourse Sharing
app.use(cors(corsOptions))

//building middleware to handle urlEncode form data (form data in other word)
// 'Content-Type': 'application/x-www-form-urlencode'
app.use(express.urlencoded({ extended: false }))

// build-in middleware for json encode
app.use(express.json())

//public server files
app.use('/', express.static(path.join(__dirname, '/public')))

// express routers
app.use('/', rootRouter)
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/employees', employeesRouter)

//handle 404
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.sendFile({ error: '404 not found' })
  } else {
    res.type('text').send('404 not found')
  }
})
app.use(errorHandler)

//initialize host
app.listen(port, () => console.log(`host run port:${port}`))
