import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = localStorage.getItem('userId') !== null

export default function ProtectPage({ children, ...rest }) {
  return (
    <Route {...rest}
      render={({ location }) => isAuthenticated ? (children) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }} />)
      }
    />
  )
}
