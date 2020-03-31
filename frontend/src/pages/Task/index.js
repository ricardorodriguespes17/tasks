import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import {
  MdArrowBack as BackIcon,
  MdAccessAlarm as ClockIcon
} from 'react-icons/md'
import './styles.css'

export default function Task() {

  const isNormal = useMediaQuery({ minWidth: 800 })

  return (
    <div className={`task-container${isNormal ? '' : '-small'}`}>
      <header>
        <Link to='/main'>
          <BackIcon size={36} color='#87CEFA' />
        </Link>
        <text className="title">Tarefa 1</text>
      </header>
      <div className="time-box">
        <ClockIcon size={32} color='#222' />
        <text className="time-text">00:00:00</text>
      </div>
      <div className="description-box">
        <text>Detalhes da tarefa...</text>
      </div>
      <div className="buttons-box">
        <button className="button-start">
          <text>Iniciar</text>
        </button>
        <button className="button-finish">
          <text>Concluir</text>
        </button>
      </div>
    </div>
  )
}
