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

  const [id, setId] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [phase, setPhase] = useState(1)
  const phases = [
    'Passe a organizar melhor suas tarefas e seu tempo!',
    'Melhore sua rotina e produtividade',
    'Cumpra seus objetivos!',
    'Fique feliz ao ver que conseguiu cumprir com seu planejamento'
  ]

  const history = useHistory()

  const isNormal = useMediaQuery({ minWidth: 1000 })

  useEffect(() => {
    setTimeout(changePhases, 5000)

    function changePhases() {
      setPhase((phase + 1) % phases.length)
    }
  }, [phase, phases])

  async function onLogin(event) {
    event.preventDefault()

    setLoading(true)

    api.post('login', { id })
      .then(res => {
        localStorage.setItem('userId', id)
        localStorage.setItem('userName', res.data.name)
        history.push('/main')
      })
      .catch(error => {
        var msg = error.response.data.error
        if (error.response.data.error === 'No user found with this ID') { msg = 'Nenhum usuário com esse id' }
        alert(msg)
      })

    setLoading(false)
  }

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
          <text>Entre com o id</text>
          <input
            className="input"
            title='Digite o id'
            value={id}
            onChange={(event) => setId(event.target.value)} />
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
