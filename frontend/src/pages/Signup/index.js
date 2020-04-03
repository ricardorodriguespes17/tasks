import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import api from '../../services/api'

import Lottie from 'react-lottie'
import { MdSubdirectoryArrowLeft as ArrowLeft } from 'react-icons/md'

import animation from '../../assets/paper-plane.json'
import logoImg from '../../assets/logo.png'

import './styles.css'

//Funcao que retorno o componente da tela de cadastro
export default function Signup() {

  //Recebe o nome que o usuario digita
  const [name, setName] = useState('')
  //Recebe o email que o usuario digita
  const [email, setEmail] = useState('')
  //Recebe a senha que o usuario digita
  const [password, setPassword] = useState('')
  //Recebe a indicacao de que a aplicacao esta carregando
  const [loading, setLoading] = useState(false)
  //Inicia o history para manipulacao das rotas
  const history = useHistory()
  //Verifica se a tela tem no minimo 1000px de largura
  const isNormal = useMediaQuery({ minWidth: 1000 })

  //Funcao que realiza manda para o servidor os dados de cadastro do usuario
  async function onSignup() {
    setLoading(true)

    api.post('signup', { name, email, password })
      .then(res => {
        history.push('/')
      })
      .catch(err => {
        var msg = err.response.data.error
        if (err.response.data.error === 'Email is being used') { msg = 'Email já cadastrado' }
        if (err.response.data.error === 'Bad Request') { msg = 'Insira os dados corretamente' }
        alert(msg)
      })

    setLoading(false)
  }

  //Retorna o JSX
  return (
    <div className={`signup-container${isNormal ? '' : '-small'}`}>
      <div className="presentation-content">
        <Lottie
          height={isNormal ? 300 : 150}
          width={isNormal ? 300 : 150}
          options={{
            loop: true,
            autoplay: true,
            animationData: animation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }} />
        <text className="boldText">É rapidinho</text>
        <text>Com poucas informações e um click, você estará cadastrado.</text>
      </div>
      <div className="inputs-content">
        <img src={logoImg} alt='Tasks' className="logo" />
        <form>
          <text>Nome</text>
          <input
            className="input"
            title='Digite o seu nome'
            value={name}
            onChange={(event) => setName(event.target.value)} />
          <text>Email</text>
          <input
            className="input"
            type="email"
            title='Digite o seu email'
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
          <text>Senha</text>
          <input
            className="input"
            type="password"
            title='Digite o seu senha'
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <button
            type="submit"
            disabled={loading}
            onClick={onSignup}
            title='Entrar'
            className="button">
            <text>Cadastrar</text>
          </button>
          <Link to='/' className="link">
            <ArrowLeft size={24} color='#87CEFA' />
            <text>Já tenho cadastro</text>
          </Link>
        </form>

      </div>
    </div>
  )
}