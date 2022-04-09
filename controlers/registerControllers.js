import bcrypt from 'bcrypt'
import User from '../model/User.js'

//initial __dirname, __filename in ES6 module
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// initial json file data with es6
import fsPromise from 'fs/promises'
const json = JSON.parse(
  await fsPromise.readFile(new URL('../model/users.json', import.meta.url))
)
const userDB = {
  users: json,
  setUsers: function (data) {
    this.users = data
  },
}

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'username and password are required' })
  const duplicate = await User.findOne({ username: user }).exec()
  if (duplicate) return res.sendStatus(409) //conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10)
    //store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    })
    console.log(result)
    res.status(201).json({ success: `New user ${user} created` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export default { handleNewUser }
