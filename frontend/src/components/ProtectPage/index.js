import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'

//Retorna o componente que ficara em volta do componente que sera protegido pela autenticacao
export default function ProtectPage({ children, ...rest }) {

  const history = useHistory()

  var isAuthenticated
  if (history.location.state && history.location.state.userId) {
    isAuthenticated = history.location.state.userId !== null
  } else {
    isAuthenticated = localStorage.getItem('userId') !== null
  }

  if (!isAuthenticated) {
    alert('Não autenticado')
  }

  return (
    //Se tiver autenticado, retorne o componente interno
    //Se nao, redireciona para pagina de login ('/' pagina raiz)
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
