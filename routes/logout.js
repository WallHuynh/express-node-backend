import express from 'express'
import logOutController from '../controlers/logOutController.js'
export const logOutRouter = express.Router()

logOutRouter.get('/', logOutController.handleLogOut)
