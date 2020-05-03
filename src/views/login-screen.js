import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../providers'
import { useQuery } from '../hooks'

const LoginScreen = styled(({ className }) => {
  const { auth, login } = useAuth()
  const history = useHistory()
  const redirectUrl = useQuery().get('redirectUrl') || '/'

  useEffect(() => {
    if (auth) {
      history.push(redirectUrl)
    }
  }, [auth])

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" />
        <button type="submit">
          {'Login'}
        </button>
      </form>
    </div>
  )
})``

export { LoginScreen }
