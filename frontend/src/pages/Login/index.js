import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Lottie from 'react-lottie'
import { MdSubdirectoryArrowRight as ArrowRight } from 'react-icons/md'

import animation from '../../assets/task-animation.json'
import logoImg from '../../assets/logo.png'

import './styles.css'

export default function Login() {

  const [phase, setPhase] = useState(1)
  const phases = [
    'Passe a organizar melhor suas tarefas e seu tempo!',
    'Melhore sua rotina e produtividade'
  ]

  const isNormal = useMediaQuery({ minWidth: 1000 })

  useEffect(() => {
    setTimeout(changePhases, 5000)

    function changePhases() {
      setPhase((phase + 1) % phases.length)
    }
  }, [phase, phases])

  return (
    <div className={`login-container${isNormal ? '' : '-small'}`}>
      <div className="presentation-content">
        <Lottie
          height={isNormal ? 400 : 150}
          width={isNormal ? 400 : 150}
          options={{
            loop: true,
            autoplay: true,
            animationData: animation,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          }} />
        <text>{phases[phase]}</text>
      </div>
      <div className="inputs-content">
        <img src={logoImg} className="logo" />
        <form>
          <text>Entre com o id</text>
          <input className="input" title='Digite o id' />
          <button type='submit' onClick={() => { }} title='Entrar' className="button">
            <text>Entrar</text>
          </button>
          <Link to='/signup' className="link">
            <ArrowRight size={24} color='#87CEFA' />
            <text>Não tenho conta</text>
          </Link>
        </form>

      </div>
    </div>
  )
}
