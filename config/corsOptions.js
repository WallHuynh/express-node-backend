const whitelist = [
  'http://localhost:6996',
  'http://127.0.0.1:9669',
  'https://www.google.com',
]
export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('not allow by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}
