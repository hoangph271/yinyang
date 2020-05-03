import React from 'react'
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

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
