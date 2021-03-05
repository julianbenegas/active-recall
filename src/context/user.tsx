import { createContext, FC, useContext } from 'react'
import { MagicUserMetadata } from '@magic-sdk/types'
import { magic } from 'lib/magic/client'
import { makeQuery } from 'lib/router'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'

type Context = {
  user: MagicUserMetadata | null | undefined
  isLoading: boolean
  onLogin: (email: string) => Promise<void>
  onLogout: () => Promise<void>
}

const UserContext = createContext<Context | undefined>(undefined)

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<MagicUserMetadata | null>()
  const isLoading = useMemo(() => user === undefined, [user])
  const router = useRouter()
  const { magic_credential } = router.query

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

  useEffect(() => {
    async function getRedirectResult(cred: string) {
      const didToken = await magic?.auth.loginWithCredential(cred)
      if (didToken) postLogin(didToken)
      makeQuery(router, { magic_credential: null })
    }
    if (typeof magic_credential === 'string') {
      getRedirectResult(magic_credential)
    }
  }, [magic_credential, postLogin, router])

  const handleLogin = useCallback(
    async (email: string) => {
      try {
        const didToken = await magic?.auth.loginWithMagicLink({
          email,
          redirectURI: window.location.href + '?auth=true'
        })
        if (didToken) await postLogin(didToken)
      } catch (error) {
        console.error(error)
      }
    },
    [postLogin]
  )

  const handleLogout = useCallback(async () => {
    try {
      await magic?.user.logout()
      setUser(null)
    } catch (error) {
      console.error(error)
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
