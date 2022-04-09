import express from 'express'
import refreshTokenController from '../controlers/refreshTokenController.js'
export const refreshRouter = express.Router()

refreshRouter.get('/', refreshTokenController.handleRefreshToken)
