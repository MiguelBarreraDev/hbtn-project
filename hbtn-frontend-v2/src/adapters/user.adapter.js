const userAdapter = (user) => ({
  name: user.nombre,
  email: user.email,
  status: user.estado,
  apellido: user.apellido,
  token: user.token
})

export default userAdapter
