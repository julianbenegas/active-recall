import { createContext, FC, useContext } from 'react'
import { MagicUserMetadata } from '@magic-sdk/types'
import { magic } from 'lib/magic/client'
import { useCallback, useEffect, useState } from 'react'

type Context = {
  user: MagicUserMetadata | null | undefined
  isLoading: boolean
  onLogin: (email: string) => Promise<void>
  onLogout: () => Promise<void>
}

const UserContext = createContext<Context | undefined>(undefined)

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<MagicUserMetadata | null>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    magic?.user
      .getMetadata()
      .then((loggedInUser) => {
        setUser(loggedInUser)
      })
      .catch(() => {
        // Assume user is not logged in
        setUser(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const postLogin = useCallback(async (did: string) => {
    try {
      // Validate didToken with server
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + did
        }
      })

      if (res.status === 200) {
        // Set the UserContext to the now logged in user
        const userMetadata = await magic?.user.getMetadata()
        setUser(userMetadata)
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  const handleLogin = useCallback(
    async (email: string) => {
      try {
        setIsLoading(true)
        const didToken = await magic?.auth.loginWithMagicLink({ email })
        if (didToken) await postLogin(didToken)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    },
    [postLogin]
  )

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true)
      await magic?.user.logout()
      setUser(null)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{ user, isLoading, onLogin: handleLogin, onLogout: handleLogout }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used below a UserProvider')
  }
  return context
}

export default UserProvider
export { useUser }
