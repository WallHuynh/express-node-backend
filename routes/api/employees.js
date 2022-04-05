import express from 'express'
import employeesControllers from '../../controlers/employeesControllers.js'
export const employeesRouter = express.Router()

employeesRouter
  .route('/')
  .get(employeesControllers.getAllEmployees)
  .post(employeesControllers.createNewEmployees)
  .put(employeesControllers.updateEmployees)
  .delete(employeesControllers.deleteEmployees)

employeesRouter.route('/:id').get(employeesControllers.getEmployee)