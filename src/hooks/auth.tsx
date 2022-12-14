import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface UserGoogleResponseFormat {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
  userStorageLoading: boolean
}

interface AuthResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true)

  const dataUserKey = '@finance_manager:user'

  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)

        const userInfo: UserGoogleResponseFormat = await response.json()

        setUser({
          id: userInfo.id,
          email: userInfo.email,
          name: `${userInfo.given_name} ${userInfo.family_name}`,
          avatar: userInfo.picture
        })

        await AsyncStorage.setItem(dataUserKey, JSON.stringify(userInfo))
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential) {
        const name = credential.fullName!.givenName!
        const avatar = `https://ui-avatars.com/api/?name=${name}&length=1`
        const userInfo: User = {
          id: String(credential.user),
          email: credential.email!,
          name,
          avatar
        }

        setUser(userInfo)
        await AsyncStorage.setItem(dataUserKey, JSON.stringify(userInfo))
      }
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(dataUserKey)
  }

  async function loadUserStorageData() {
    const data = await AsyncStorage.getItem(dataUserKey);

    if (data) {
      const userInfo = JSON.parse(data);
      setUser(userInfo)
    }

    setUserStorageLoading(false);
  }

  useEffect(() => {
    loadUserStorageData()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }
