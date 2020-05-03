import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoginScreen, GalleryScreen, NotFoundScreen, UploadScreen } from './views'
import { AuthProvider } from './providers'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/auth">
          <LoginScreen />
        </Route>
        <Route path="/gallery">
          <GalleryScreen />
        </Route>
        <Route path="/upload">
          <UploadScreen />
        </Route>
        <Route>
          <NotFoundScreen />
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
