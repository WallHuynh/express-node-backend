import { allowOrigins } from './allowOrigins.js'

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allow by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
