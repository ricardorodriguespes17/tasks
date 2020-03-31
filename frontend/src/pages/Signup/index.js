import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Lottie from 'react-lottie'
import { MdSubdirectoryArrowLeft as ArrowLeft } from 'react-icons/md'

import animation from '../../assets/paper-plane.json'
import logoImg from '../../assets/logo.png'

import './styles.css'

export default function Signup() {

  const isNormal = useMediaQuery({ minWidth: 1000 })

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
        <img src={logoImg} className="logo" />
        <form>
          <text>Nome</text>
          <input className="input" title='Digite o seu nome' />
          <text>Email</text>
          <input className="input" type="email" title='Digite o seu email' />
          <button type="submit" onClick={() => { }} title='Entrar' className="button">
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