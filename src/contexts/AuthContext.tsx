import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

type  UserProps = {
  id: string
  name: string
  email: string
  token: string
}
type AuthContextData = {
  user: UserProps | undefined
  isAuthenticated: boolean
  signIn: (credentials: SignInProps) => Promise<void>
  signOut: () => Promise<void>
  loadingAuth: boolean
  loading: boolean
}
type SignInProps = {
  email: string
  password: string
}


export const AuthContext = createContext({} as AuthContextData )







export function AuthProvider({children}:{children: ReactNode}) {
  const [loadingAuth,setLoadingAuth] = useState(false);
  const [ loading, setLoading] = useState(true)
  const [ user, setUser] = useState<UserProps>()
  async function signIn({ email , password}:SignInProps) {
    setLoadingAuth(true)

    try {
      const response = await api.post('/session', {
        email,
        password
      })
      await AsyncStorage.setItem('@pizza', JSON.stringify(response.data))

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

      setUser(response.data)
      setLoadingAuth(false)
    } catch (error) {
      console.log(error)
      setLoadingAuth(false)

    }


  }
  async function signOut() {
    await AsyncStorage.clear()
    .then(() => {
      setUser(undefined)
    })
  }

  useEffect(() => {
    async function getUser() {
     const userInfo = await  AsyncStorage.getItem('@pizza')
      let hasUser:UserProps = JSON.parse(userInfo ||  '{}')
      if(Object.keys(hasUser).length > 0) {
      api.defaults.headers.common['Authorization'] = `Bearer ${hasUser.token}`
      setUser(hasUser)
      setLoading(false)
      }
    }

    getUser()
  },[])
  const isAuthenticated = !!user
  return (
    <AuthContext.Provider value={{user, isAuthenticated, signIn, loading,loadingAuth, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}