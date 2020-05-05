import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StandardLayout } from '../components'
import { useApis, useAuthRequired } from '../hooks'

const AccountScreen = styled(({ className }) => {
  const { notAuthenticated } = useAuthRequired()

  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  const { getUser } = useApis()

  useEffect(() => {
    if (notAuthenticated) return

    let isMounted = true
    setIsLoading(isLoading)

    getUser().then(async res => {
      if (isMounted && res.ok) {
        const user = await res.json()
        setUser(user)
        setIsLoading(false)
      }
    })

    return () => { isMounted = false }
  }, [getUser, isLoading, notAuthenticated])

  return (
    <StandardLayout className={className}>
      <div className="message">
        {user && user.username}
      </div>
    </StandardLayout>
  )
})`
  .message {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export { AccountScreen }
