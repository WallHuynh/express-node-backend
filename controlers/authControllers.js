import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: 'username and password are required' })
  const foundUser = await User.findOne({ username: user }).exec()
  console.log(foundUser)
  if (!foundUser) return res.sendStatus(401) //unauthorized
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password)
  if (match) {
    const roles = Object.values(foundUser.roles)
    //create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: foundUser.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )

    // await User.updateOne(foundUser, { refreshToken: refreshToken })
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result)
    
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    }) //secure: true,
    res.json({
      accessToken,
      success: `User ${foundUser.username} is logged in`,
    })
  } else {
    res.sendStatus(401) //unauthorized
  }
}
export default { handleLogin }
