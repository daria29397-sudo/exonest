'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface AccountUser {
  name: string
  email: string
}

interface AccountContextValue {
  user: AccountUser | null
  ready: boolean
  login: (email: string, name?: string) => void
  logout: () => void
}

const STORAGE_KEY = 'exonest-account'
const AccountContext = createContext<AccountContextValue | null>(null)

const nameFromEmail = (email: string) => {
  const local = email.split('@')[0]?.trim()
  if (!local) return 'Гість'
  return local.charAt(0).toUpperCase() + local.slice(1)
}

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw) as AccountUser)
    } catch {
      /* сховище недоступне */
    }
    setReady(true)
  }, [])

  const login = useCallback((email: string, name?: string) => {
    const next: AccountUser = { email: email.trim(), name: name?.trim() || nameFromEmail(email) }
    setUser(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* сховище недоступне */
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* сховище недоступне */
    }
  }, [])

  const value = useMemo(() => ({ user, ready, login, logout }), [user, ready, login, logout])
  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

export function useAccount() {
  const ctx = useContext(AccountContext)
  if (!ctx) throw new Error('useAccount must be used within AccountProvider')
  return ctx
}
