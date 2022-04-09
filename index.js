import express from 'express'
import { logger } from './middleware/logEvents.js'
import { errorHandler } from './middleware/errorHandler.js'
import { rootRouter } from './routes/root.js'
import { employeesRouter } from './routes/api/employees.js'
import { registerRouter } from './routes/register.js'
import { authRouter } from './routes/auth.js'
import { refreshRouter } from './routes/refresh.js'
import { logOutRouter } from './routes/logout.js'
import cors from 'cors'
import { corsOptions } from './config/corsOptions.js'
import { verifyJWT } from './middleware/verifyJWT.js'
import cookieParser from 'cookie-parser'
import { credentials } from './middleware/credentials.js'
import mongoose from 'mongoose'
import { connectDB } from './config/dbconn.js'
import dotenv from 'dotenv'
dotenv.config()

//initialize app with express
const app = express()

//initial __dirname, __filename in @ES6 module
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 9669

// connect mongoDB
connectDB()

//custom middleware logger
app.use(logger)

//Handle option credentials check - before Cors
//and fetch cookies credentials requirement
app.use(credentials)

// Cross Origin Resourse Sharing
app.use(cors(corsOptions))

//building middleware to handle urlEncode form data (form data in other word)
// 'Content-Type': 'application/x-www-form-urlencode'
app.use(express.urlencoded({ extended: false }))

// build-in middleware for json encode
app.use(express.json())

//add middleware for cookie
app.use(cookieParser())

//public server files
app.use('/', express.static(path.join(__dirname, '/public')))

// express routers
app.use('/', rootRouter)
app.use('/register', registerRouter)
app.use('/auth', authRouter)
app.use('/refresh', refreshRouter)
app.use('/logout', logOutRouter)

app.use(verifyJWT)
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
mongoose.connection.once('open', () => {
  console.log('Connected to mongoDb')
  app.listen(port, () => console.log(`host run on port:${port}`))
})
