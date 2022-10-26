import { apiInstance } from "@/utilities"

export const loginService = (data) => {
  const controller = new AbortController()
  return {
    controller,
    call: apiInstance.post('/login', { data, signal: controller.signal })
  }
}

export const studentsService = ({ id = null }) => {
  const controller = new AbortController()
  return {
    controller,
    call: apiInstance.get('/students', {
      params: { id },
      signal: controller.signal
    })
  }
}

export const usersService = () => {
  const controller = new AbortController()
  return {
    controller,
    call: apiInstance.get('/users', { signal: controller.signal })
  }
}
