import { logEvents } from './logEvents.js'

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}: ${err.message}`, 'errorLog.txt')
  console.log(err.stack)
  console.log(err.name)
  console.log(err.message)
  res.status(500).send(err.message)
}
export { errorHandler }
