import express from 'express'
export const rootRouter = express.Router()

//initial __dirname, __filename in ES6 module
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

rootRouter.get('^/$|/index(.html)?', (req, res) => {
  //   res.sendFile('./views/index.html', { root: __dirname })\
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})
