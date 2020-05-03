import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginScreen, GalleryScreen } from './views'
import { AuthProvider } from './providers'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <LoginScreen />
        </Route>
        <Route path="/" exact>
          <GalleryScreen />
        </Route>
        <Route>
          <div>{'404 | Not found'}</div>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const App = styled(({ className }) => {
  return (
    <AuthProvider>
      <div className={[className, 'App'].join(' ')}>
        <AppRouter />
      </div>
    </AuthProvider>
  )
})`
  display: flex;
  background-color: #282c34;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

export default App
