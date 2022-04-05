import { readFile } from 'fs/promises'
const json = JSON.parse(
  await readFile(new URL('../model/employees.json', import.meta.url))
)

const data = {
  employees: json,
  setEmployee: function (data) {
    this.employees = data
  },
}

const getAllEmployees = (req, res) => {
  res.json(data.employees)
}

const createNewEmployees = (req, res) => {
  const newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  }
  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ message: 'firstname and lastname are required' })
  }
  data.setEmployee([...data.employees, newEmployee])
  res.status(201).json(data.employees)
}

const updateEmployees = (req, res) => {
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
  if (!employee) {
    res.status(400).json({ message: `Employee ID: ${req.body.id} not found` })
  }
  if (req.body.firstname) employee.firstname = req.body.firstname
  if (req.body.lastname) employee.lastname = req.body.lastname
  const filteredArray = data.employees.filter(
    emp => emp.id !== parseInt(req.body.id)
  )
  const unsortedArray = [...filteredArray, employee]
  data.setEmployee(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  )
  res.json(data.employees)
}

const deleteEmployees = (req, res) => {
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
  if (!employee) {
    res.status(400).json({ message: `Employee ID: ${req.body.id} not found` })
  }
  const filteredArray = data.employees.filter(
    emp => emp.id !== parseInt(req.body.id)
  )
  data.setEmployee([...filteredArray])
  res.json(data.employees)
}

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    emp => emp.id === parseInt(req.params.id)
  )
  if (!employee) {
    res.status(400).json({ message: `Employee ID: ${req.body.id} not found` })
  }
  res.json(employee)
}

export default {
  getAllEmployees,
  createNewEmployees,
  updateEmployees,
  deleteEmployees,
  getEmployee,
}
