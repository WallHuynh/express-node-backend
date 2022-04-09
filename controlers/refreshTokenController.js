import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(401)
  const refreshToken = cookies.jwt
  const foundUser = await User.findOne({ refreshToken }).exec()
  console.log('foundUser', foundUser)
  if (!foundUser) return res.sendStatus(403) //forbiden
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403) //forbiden
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles: roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    )
    res.json({ accessToken })
  })
}
export default { handleRefreshToken }
