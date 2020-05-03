import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { StandardLayout } from '../components'
import { useAuth } from '../providers'
import { useQuery } from '../hooks'

const LoginScreen = styled(({ className }) => {
  const { auth, login, isLoading } = useAuth()
  const history = useHistory()
  const redirectUrl = useQuery().get('redirectUrl') || '/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth) {
      history.push(redirectUrl)
    }
  }, [auth, history, redirectUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login({ username, password })
  }

  return (
    <StandardLayout className={className}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            type="text"
            value={username}
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" disabled={isLoading}>
            {'Login'}
          </button>
        </div>
      </form>
    </StandardLayout>
  )
})``

export { LoginScreen }
