import {createContext  ,useState } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [isAuth , setAuth] = useState("false")
    const [token , setToken] = useState(null)

     const toggleAuth = (token) => {
        if(token){
            setAuth (isAuth)
            setToken(token)
        }
    }

   return  (<AuthContext.Provider value={{toggleAuth , isAuth , token}}>
        {children}
        </AuthContext.Provider>
   )
}