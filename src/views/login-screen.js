import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../providers'

const LoginScreen = styled(({ className }) => {
  const { auth, login } = useAuth()
  const history = useHistory()
  const params = useParams()

  useEffect(() => {
    if (auth) {
      history.push(params.redirectUrl || '/')
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
