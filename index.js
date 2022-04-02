import fs from 'fs'
import express from 'express'
const app = express()

//initial __dirname, __filename in ES6 module
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const port = process.env.PORT || 8888

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(port, () => console.log(`host run port:${port}`))
