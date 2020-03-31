import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import Drawer from '../../components/Drawer'

import {
  MdMenu as MenuIcon,
  MdInput as LogoutIcon,
  MdAdd as AddIcon,
  MdCheckBoxOutlineBlank as CheckOffIcon,
  MdAccessAlarm as ClockIcon
} from 'react-icons/md'

import './styles.css'

export default function Main() {

  const [showDrawer, setShowDrawer] = useState(false)

  const isNormal = useMediaQuery({ minWidth: 1000 })

  return (
    <div className={`main-container${isNormal ? '' : '-small'}`}>
      <Drawer open={showDrawer} close={setShowDrawer} />
      <header>
        <MenuIcon size={isNormal ? 48 : 32} color='#87CEFA' onClick={() => setShowDrawer(true)} />
        <text className="title">Bem-vindo, Ricardo</text>
        <Link>
          <text>Sair</text>
          <LogoutIcon size={isNormal ? 48 : 32} color='#87CEFA' />
        </Link>
      </header>
      <div className="body">
        <text className="time">Tempo Total Trabalhado: 00:00:00</text>
        <ul>
          <li onClick={() => {}}>
            <div className="title-task">
              <text>Tarefa 1</text>
              <CheckOffIcon size={isNormal ? 36 : 28} color='#FFF' />
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={32} color='#222' />
              <text>00:00:00</text>
            </div>
          </li>
          <li onClick={() => {}}>
            <div className="title-task">
              <text>Tarefa 1</text>
              <CheckOffIcon size={isNormal ? 36 : 28} color='#FFF' />
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={32} color='#222' />
              <text>00:00:00</text>
            </div>
          </li>
          <li onClick={() => {}}>
            <div className="title-task">
              <text>Tarefa 1</text>
              <CheckOffIcon size={isNormal ? 36 : 28} color='#FFF' />
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={32} color='#222' />
              <text>00:00:00</text>
            </div>
          </li>
          <li onClick={() => {}}>
            <div className="title-task">
              <text>Tarefa 1</text>
              <CheckOffIcon size={isNormal ? 36 : 28} color='#FFF' />
            </div>
            <div className="description-task-box">
              <text>Detalhes da tarefa...</text>
            </div>
            <div className="time-task-box">
              <ClockIcon size={32} color='#222' />
              <text>00:00:00</text>
            </div>
          </li>
        </ul>

      </div>
      <buttton>
        <AddIcon size={48} color='#FFF' />
      </buttton>
    </div>
  )
}