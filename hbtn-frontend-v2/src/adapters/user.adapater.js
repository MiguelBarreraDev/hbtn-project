const userAdapter = (user) => ({
  name: user.name,
  surname: user.surname,
  username: user.username,
  jwt: user.jwt
})

export default userAdapter
