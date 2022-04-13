import {
  createContext,
  useCallback,
  useContext,
  useState,
  ReactNode,
} from 'react'
import { isJsxOpeningElement } from 'typescript'

import { api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  email: string
  id: string
}

interface AuthState {
  accessToken: string
  user: User
}

interface SignInProps {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: SignInProps) => Promise<void>
  user: User
  accessToken: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem('@Doit:accessToken')
    const user = localStorage.getItem('@Doit:user')

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    const response = await api.post('/login', { email, password })
    console.log(response)

    const { accessToken, user } = response.data
    localStorage.setItem('@Doit:accessToken', accessToken)
    localStorage.setItem('@Doin:user', JSON.stringify(user))

    setData({ accessToken, user })
  }, [])

  return (
    <AuthContext.Provider
      value={{ 
          user: data.user, 
          accessToken: data.accessToken, 
          signIn }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, useAuth }
