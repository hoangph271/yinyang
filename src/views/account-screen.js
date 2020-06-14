import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { StandardLayout } from '../components'
import { useApis, useAuthRequired } from '../hooks'

const AccountScreen = ({ className }) => {
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
      {user && (
        <div className="profile">
          <div
            className="avatar"
            style={{ backgroundImage: `url(${'https://avatars3.githubusercontent.com/u/39024711?s=460&u=4782bf0b8871df35fe01a192fcbc45feab6efe86&v=4'})` }}
          />
          <div>
            <div>
              {user.fullname}
            </div>
            <div>
              {user.gender}
            </div>
          </div>
        </div>
      )}
    </StandardLayout>
  )
}

const StyledAccountScreen = styled(AccountScreen)`
  .profile {
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;

    .avatar {
      width: 12rem;
      height: 12rem;
      background-position: center;
      background-size: contain;
    }
  }
`

export { StyledAccountScreen as AccountScreen }
