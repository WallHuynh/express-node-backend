import { readFile } from 'fs/promises'

const json = JSON.parse(
  await readFile(new URL('./employees.json', import.meta.url))
)
const data = {}
console.log('first', json)
data.emplyees = json
console.log('second', data)
