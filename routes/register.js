import express from 'express'
import registerControllers from '../controlers/registerControllers.js'
export const registerRouter = express.Router()

registerRouter.post('/', registerControllers.handleNewUser)