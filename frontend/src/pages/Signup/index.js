import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import api from '../../services/api'

import Lottie from 'react-lottie'
import { MdSubdirectoryArrowLeft as ArrowLeft } from 'react-icons/md'

import animation from '../../assets/paper-plane.json'
import logoImg from '../../assets/logo.png'

import './styles.css'

export default function Signup() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const isNormal = useMediaQuery({ minWidth: 1000 })

  async function onSignup() {
    setLoading(true)

    api.post('signup', { name, email })
      .then(res => {
        console.log(res.data.id)
        alert(`Seu id é ${res.data.id}`)
        history.push('/')
      })
      .catch(err => {
        var msg = err.response.data.error
        if (err.response.data.error === 'Email is being used') { msg = 'Email já cadastrado' }
        alert(msg)
      })

    setLoading(false)
  }

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
          <button
            type="submit"
            disabled={loading}
            onClick={onSignup}
            title='Entrar'
            className="button">
            <text>Entrar</text>
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