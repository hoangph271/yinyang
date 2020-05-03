import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const NavBar = styled(({ navItems, className }) => {
  return (
    <nav className={className}>
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink to={item.to}>
              {item.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
})`
  ul {
    display: flex;
    list-style-type: none;
    justify-content: space-around;

    li > a {
      text-decoration: none;
      color: #0984e3;
    }
    li > a.active {
      color: #6c5ce7;
    }
  }
`

export { NavBar }
