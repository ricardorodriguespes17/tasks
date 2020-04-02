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

//Funcao que retorna o componente da tela de tarefas concluidas
export default function TaskFinisheds() {

  //Recupera o id do usuario logado
  const userId = localStorage.getItem('userId')
  //Inicia o history para manipulacao das rotas
  const history = useHistory()
  //Um parametro para abrir ou fechar a gaveta lateral-esquerda
  const [showDrawer, setShowDrawer] = useState(false)
  //Recebe todas as tarefas do usuario
  const [tasksFinisheds, setTasksFinisheds] = useState([])

  const isNormal = useMediaQuery({ minWidth: 1000 })

  //Chama funcao para carregar as tarefas concluidas
  useEffect(() => { loadTask() })

  //Funcao para carregar as tarefas concluidas
  async function loadTask() {
    await api.get('/tasks', {
      headers: {
        authorization: userId
      }
    })
      .then(res => {
        var tasks = res.data.filter(task => task.status === 'finished')
        setTasksFinisheds(tasks)
      })
      .catch(err => {

      })
  }

  //Funcao chamada para fazer logout do usuario (sair)
  function onLogout() {
    localStorage.clear()
    history.push('/')
  }

  //Retorna o JSX
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
          {tasksFinisheds.map(task => (<TaskItem task={task} type='finisheds' />))}
        </ul>

      </div>
    </div>
  )
}
