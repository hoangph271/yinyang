import React from 'react'
import styled from 'styled-components'
import { NavBar } from '../components'

const navItems = [
  { to: '/gallery', text: 'Gallery' },
  { to: '/upload', text: 'Upload' },
  { to: '/account', text: 'Account' },
]
const StandardLayout = styled(({ className, children }) => {
  return (
    <div className={className}>
      <NavBar navItems={navItems} />
      <main>
        {children}
      </main>
    </div>
  )
})`
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  main {
    flex-grow: 1;
  }
`

export { StandardLayout }
