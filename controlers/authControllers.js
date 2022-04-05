import bcrypt from 'bcrypt'
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

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'username and password are required' })
  const foundUser = userDB.users.find(person => person.username === user)
  if (!foundUser) return res.sendStatus(401) //unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    //create JWTs
    res.json({ success: `User ${user} is logged in` })
  } else {
    res.sendStatus(401) //unauthorized
  }
}
export default { handleLogin }
