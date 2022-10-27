import { publicsRoutes } from '@/config'
import { loginService } from '@/services'
import { ls } from '@/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAdapter } from '@/adapters'
import useAsyncCall from './useAsyncCall'
import { createUser, resetUser } from '@/redux/states'

export default function useAuth () {
  const navigate = useNavigate()
  const userState = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { callEndpoint, loading } = useAsyncCall()

  const login = async ({ token }) => {
    const response = await callEndpoint(loginService({ token }))

    // Hanlde error
    if (response?.error) return response
    console.log(response)
    // Set auth token
    ls.setItem('token', token)

    // Create new user in memory
    response.token = token
    dispatch(createUser(userAdapter(response)))
    navigate('/')
  }

  const logout = ({ redirect = true } = {}) => {
    // Remove token of the local storage
    ls.removeItem('token')

    // Remove current session of the user
    dispatch(resetUser())
    redirect && navigate(publicsRoutes.LOGIN.path)
  }

  return {
    login,
    logout,
    isLogged: Boolean(userState.token),
    loading,
    user: userState
  }
}
