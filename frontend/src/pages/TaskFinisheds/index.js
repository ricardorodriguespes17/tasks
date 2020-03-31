import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Drawer from '../../components/Drawer'

import {
  MdMenu as MenuIcon,
  MdInput as LogoutIcon,
  MdAccessAlarm as ClockIcon
} from 'react-icons/md'

import './styles.css'

export default function TaskFinisheds() {

  const [showDrawer, setShowDrawer] = useState(false)

  const isNormal = useMediaQuery({ minWidth: 1000 })

  return (
    <div className={`finisheds-container${isNormal ? '' : '-small'}`}>
      <Drawer open={showDrawer} close={setShowDrawer} />
      <header>
        <MenuIcon size={isNormal ? 48 : 32} color='#87CEFA' onClick={() => setShowDrawer(true)} />
        <text className="title">Tarefas Concluídas</text>
        <Link>
          <text>Sair</text>
          <LogoutIcon size={isNormal ? 48 : 32} color='#87CEFA' />
        </Link>
      </header>
      <div className="body">
        <ul>
          <li>
            <div className="title-task">
              <text>Tarefa 1</text>
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={isNormal ? 32 : 24} color='#222' />
              <text>00:00:00</text>
            </div>
            <button onClick={() => {}}>
              <text>Reabrir tarefa</text>
            </button>
          </li>
          <li>
            <div className="title-task">
              <text>Tarefa 1</text>
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={isNormal ? 32 : 24} color='#222' />
              <text>00:00:00</text>
            </div>
            <button onClick={() => {}}>
              <text>Reabrir tarefa</text>
            </button>
          </li>
          <li>
            <div className="title-task">
              <text>Tarefa 1</text>
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={isNormal ? 32 : 24} color='#222' />
              <text>00:00:00</text>
            </div>
            <button onClick={() => {}}>
              <text>Reabrir tarefa</text>
            </button>
          </li>
        </ul>

      </div>
    </div>
  )
}
