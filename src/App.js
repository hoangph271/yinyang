import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import * as Views from './views'
import { AuthProvider } from './providers'

const AppRouter = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/auth">
          <Views.LoginScreen />
        </Route>
        <Route path="/gallery">
          <Views.GalleryScreen />
        </Route>
        <Route path="/upload">
          <Views.UploadScreen />
        </Route>
        <Route path="/account">
          <Views.AccountScreen />
        </Route>
        <Route>
          <Views.NotFoundScreen />
        </Route>
      </Switch>
    </HashRouter>
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
