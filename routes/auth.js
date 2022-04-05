import express from 'express'
import authControllers from '../controlers/authControllers.js'
export const authRouter = express.Router()

authRouter.post('/', authControllers.handleLogin)
