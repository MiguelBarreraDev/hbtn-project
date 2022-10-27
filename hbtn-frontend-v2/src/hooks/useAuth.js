import { publicsRoutes } from '@/config'
// import { createUser, resetUser } from '@/redux/states'
import { loginService } from '@/services'
import { ls } from '@/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userAdapter } from '@/adapters'
import useAsyncCall from './useAsyncCall'
import { createUser, resetUser } from '@/redux'

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
    // ls.setItem('jwt', response.jwt)

    // // Create new user in memory
    // dispatch(createUser(userAdapter(response)))
    // navigate('/')
  }

  const logout = ({ redirect = true } = {}) => {
    // Unset auth token
    ls.removeItem('jwt')

    // Remove current session of the user
    dispatch(resetUser())
    redirect && navigate(publicsRoutes.LOGIN.path)
  }

  return {
    login,
    logout,
    isLogged: Boolean(userState.jwt),
    loading,
    user: userState
  }
}
