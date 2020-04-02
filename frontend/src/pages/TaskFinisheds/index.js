import React, { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useHistory } from 'react-router'

import Drawer from '../../components/DrawerLeft'
import TaskItem from '../../components/TaskItem'

import {
  MdMenu as MenuIcon,
  MdInput as LogoutIcon
} from 'react-icons/md'

import './styles.css'

import api from '../../services/api'

export default function TaskFinisheds() {

  const userId = localStorage.getItem('userId')

  const history = useHistory()

  const [showDrawer, setShowDrawer] = useState(false)
  const [tasks, setTasks] = useState([])

  const isNormal = useMediaQuery({ minWidth: 1000 })

  useEffect(() => {
    async function loadTask() {
      await api.get('/tasks', {
        headers: {
          authorization: userId
        }
      })
        .then(res => {
          setTasks(res.data)
        })
        .catch(err => {

        })
    }
    loadTask()
  }, [userId])

  function onLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <div className={`finisheds-container${isNormal ? '' : '-small'}`}>
      <Drawer open={showDrawer} close={setShowDrawer} />
      <header>
        <MenuIcon size={isNormal ? 48 : 32} color='#87CEFA' onClick={() => setShowDrawer(true)} />
        <text className="title">Tarefas Concluídas</text>
        <div className="header-button" onClick={onLogout} title='Sair'>
          <text>Sair</text>
          <LogoutIcon size={isNormal ? 48 : 32} color='#87CEFA' />
        </div>
      </header>
      <div className="body">
        <ul>
          {tasks.map(task => {
            if (task.status === 'finished') {
              return (
                <TaskItem task={task} type='finisheds' />
              )
            }
            return null
          })}
        </ul>

      </div>
    </div>
  )
}
