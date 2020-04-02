import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = localStorage.getItem('userId') !== null

//Retorna o componente que ficara em volta do componente que sera protegido pela autenticacao
export default function ProtectPage({ children, ...rest }) {
  if(!isAuthenticated) {
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
