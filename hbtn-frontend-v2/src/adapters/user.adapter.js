const userAdapter = (user) => ({
  name: user.name,
  email: user.email,
  token: user.token
})

export default userAdapter
