import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import api from '../../services/api'

import Lottie from 'react-lottie'
import { MdSubdirectoryArrowRight as ArrowRight } from 'react-icons/md'

import animation from '../../assets/task-animation.json'
import loading from '../../assets/loading.json'
import logoImg from '../../assets/logo.png'

import './styles.css'

export default function Login() {

  //Recebe o email digitado pelo usuario
  const [email, setEmail] = useState('')
  //Recebe a senha digitado pelo usuario
  const [password, setPassword] = useState('')
  //Recebe a verificacao de que a aplicacao esta carregando
  const [isLoading, setLoading] = useState(false)
  //variavel para mudar a frase na tela
  const [phase, setPhase] = useState(1)
  //Frases usadas na parte de apresentacao
  const phases = [
    'Passe a organizar melhor suas tarefas e seu tempo!',
    'Melhore sua rotina e produtividade',
    'Cumpra seus objetivos!',
    'Fique feliz ao ver que conseguiu cumprir com seu planejamento'
  ]
  //Inicia o history que fara manipulacoes nas rotas
  const history = useHistory()
  //Verifica se a tela esta pelo menos com 1000px de largura
  const isNormal = useMediaQuery({ minWidth: 1000 })

  //Muda a frase de apresentacao a cada 5 segundos (5000 ms)
  useEffect(() => {
    setTimeout(changePhases, 5000)

    function changePhases() {
      setPhase((phase + 1) % phases.length)
    }
  }, [phase, phases])

  //Funcao chamada para fazer o login com os dados digitados
  async function onLogin(event) {
    //Previni que a pagina recarregue
    event.preventDefault()
    //Indica que ficara carregando ate terminar a acao
    setLoading(true)

    await api.post('login', { email, password })
      .then(res => {
        localStorage.setItem('userId', res.data.id)
        localStorage.setItem('userName', res.data.name)
        //Vai para pagina principal da aplicacao
        history.push({
          pathname: '/main',
          state: {
            userId: res.data.userId
          }
        })
      })
      .catch(error => {
        var msg = error.response.data.error
        if (error.response.data.error === 'No user found with this email') { msg = 'Nenhum usuário com esse email' }
        if (error.response.data.error === 'Incorret password') { msg = 'Senha incorreta' }
        if (error.response.data.error === 'Bad Request') { msg = 'Insira os dados corretamente' }
        alert(msg)
      })

    //Indica que nao esta mais carregando
    setLoading(false)
  }

  //Retorna o JSX
  return (
    <div className={`login-container${isNormal ? '' : '-small'}`}>
      <div className="presentation-content">
        <Lottie
          height={isNormal ? 400 : 150}
          width={isNormal ? 400 : 150}
          options={{
            loop: true,
            autoplay: true,
            animationData: isLoading ? loading : animation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }} />
        <text>{phases[phase]}</text>
      </div>
      <div className="inputs-content">
        <img src={logoImg} alt='Tasks' className="logo" />
        <form>
          <text>Email</text>
          <input
            className="input"
            title='Digite o email'
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
          <text>Senha</text>
          <input
            className="input"
            type='password'
            title='Digite a senha'
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <button
            type='submit'
            disabled={isLoading}
            title='Entrar'
            onClick={onLogin}
            className="button">
            <text>Entrar</text>
          </button>
          <Link
            to={isLoading ? '/' : '/signup'}
            className="link">
            <ArrowRight size={24} color='#87CEFA' />
            <text>Não tenho conta</text>
          </Link>
        </form>

      </div>
    </div>
  )
}
