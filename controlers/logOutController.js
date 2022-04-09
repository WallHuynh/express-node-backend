import User from '../model/User.js'

const handleLogOut = async (req, res) => {
  // On client also delete the accessToken
  const cookies = req.cookies
  if (!cookies?.jwt) return res.sendStatus(204) //no content
  const refreshToken = cookies.jwt
  //is refreshToken in DB
  const foundUser = await User.findOne({ refreshToken }).exec()
  console.log('foundUser', foundUser)
  if (!foundUser) {
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    })
    return res.sendStatus(204) //no content
  }
  // Delete refreshToken in DB
  foundUser.refreshToken = ''
  const result = await foundUser.save()
  console.log('result', result)
  res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
  res.sendStatus(204)
}
export default { handleLogOut }
