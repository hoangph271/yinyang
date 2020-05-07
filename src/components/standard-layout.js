import React from 'react'
import styled from 'styled-components'
import { NavBar } from '../components'

const navItems = [
  { to: '/gallery', text: 'Gallery' },
  { to: '/upload', text: 'Upload' },
  { to: '/account', text: 'Account' },
]
const StandardLayout = styled(({ className, children, mainClassName = '' }) => {
  return (
    <div className={className}>
      <NavBar navItems={navItems} />
      <main className={['main', mainClassName].join(' ')}>
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

  .main {
    display: flex;
    flex-grow: 1;
  }
`

export { StandardLayout }
