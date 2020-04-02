import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import api from '../../services/api'

import DrawerLeft from '../../components/DrawerLeft'
import AddTask from '../../components/AddTask'
import TaskItem from '../../components/TaskItem'

import {
  MdMenu as MenuIcon,
  MdInput as LogoutIcon,
  MdAdd as AddIcon,
} from 'react-icons/md'

import './styles.css'

import taskTime from '../../utils/taskTime'
import TimeFormat from '../../utils/TimeFormat'

//Retorna o componente da tela principal da aplicacao
export default function Main() {

  //Recupera o id do usuario logado
  const userId = localStorage.getItem('userId')
  //Recupera o nome do usuario logado
  const userName = localStorage.getItem('userName')
  //Recebe o primeiro nome do usuario logado
  var userFirstName = userName.split(' ')[0] 
  //Incia o history para manipulacao das rotas
  const history = useHistory()
  //Um parametro para atualizacao do tempo total trabalhado  
  const [seconds, setSeconds] = useState(0)
  //Um parametro para indicar a abertura da gaveta lateral-esquerda
  const [showDrawerLeft, setShowDrawerLeft] = useState(false)
  //Um parametro para indicar a abertura da gaveta de baixo
  const [showAddTask, setShowAddTask] = useState(false)
  //Recebe todas as tarefas do usuario
  const [tasks, setTasks] = useState([])
  //Recebe o tempo total trabalhado (soma de todas as suas tarefas) pelo usuario  
  const [timeTotal, setTimeTotal] = useState('')
  //Verifica se a tela tem no minimo 1000px de largura
  const isNormal = useMediaQuery({ minWidth: 1000 })

  //Chama a funcao para carregar as tarefas do usuario
  useEffect(() => {
    loadTask()
  })

  //Atualiza a variavel secounds para indicar a atualizacao do tempo total
  useEffect(() => {
    setInterval(() => setSeconds(new Date().getTime()), 1000)
  }, [])

  //Atualiza o tempo total trabalhado
  useEffect(() => {
    var newTasks = tasks
    var newTimeTotal = '00:00:00'
    newTasks.map(task => {
      var taskTimeFormated = taskTime(
        task.status,
        task.startedIn === null ? '' : task.startedIn,
        task.finishedIn === null ? '' : task.finishedIn
      )

      newTimeTotal =
        TimeFormat.timeToClock(TimeFormat.clockToTime(taskTimeFormated) +
          TimeFormat.clockToTime(newTimeTotal))

      return task
    })

    setTimeTotal(newTimeTotal)
  }, [seconds, tasks])

  //Funcao que carrega do banco de dados as tarefas do usuario
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

  //Funcao chamada quando usuario clica em um tarefa, ira abrir a tela da tarefa
  function openTask(task) {
    localStorage.setItem('task', JSON.stringify(task))
    history.push('/task')
  }

  //Funcao chamada para fazer a logout do usuario (sair)
  function onLogout() {
    localStorage.clear()
    history.push('/')
  }

  //Retorna o JSX
  return (
    <div className={`main-container${isNormal ? '' : '-small'}`}>
      <DrawerLeft open={showDrawerLeft} close={setShowDrawerLeft} />
      <header>
        <MenuIcon size={isNormal ? 48 : 32} color='#87CEFA' onClick={() => setShowDrawerLeft(true)} />
        <text className="title">Bem-vindo, {userFirstName}</text>
        <div className="header-button" onClick={onLogout} title='Sair'>
          <text>Sair</text>
          <LogoutIcon size={isNormal ? 48 : 32} color='#87CEFA' />
        </div>
      </header>
      <div className="body">
        <text className="time">Tempo Total Trabalhado: {timeTotal}</text>
        <ul>
          {tasks.map(task => {
            if (task.status !== 'finished')
              return (<TaskItem task={task} type='active' openTask={openTask} />)
            else
              return null
          })}
        </ul>
      </div>
      <buttton className="fab" onClick={() => setShowAddTask(true)}>
        <AddIcon size={48} color='#FFF' />
      </buttton>
      <AddTask open={showAddTask} close={setShowAddTask} />
    </div>
  )
}