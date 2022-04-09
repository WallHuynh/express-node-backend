import express from 'express'
import employeesControllers from '../../controlers/employeesControllers.js'
import { ROLES_LIST } from '../../config/roles_list.js'
import { verifyRoles } from '../../middleware/verifyRoles.js'
export const employeesRouter = express.Router()

employeesRouter
  .route('/')
  .get(employeesControllers.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesControllers.createNewEmployees
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeesControllers.updateEmployees
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeesControllers.deleteEmployees)

employeesRouter.route('/:id').get(employeesControllers.getEmployee)
