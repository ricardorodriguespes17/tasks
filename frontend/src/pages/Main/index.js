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

export default function Main() {

  const userName = localStorage.getItem('userName')
  const userFirstName = userName.split(' ')[0]
  const userId = localStorage.getItem('userId')

  const [seconds, setSeconds] = useState(0)
  const [showDrawerLeft, setShowDrawerLeft] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  const [timeTotal, setTimeTotal] = useState('')

  const history = useHistory()

  const isNormal = useMediaQuery({ minWidth: 1000 })

  useEffect(() => {
    loadTask()
  })

  useEffect(() => {
    setInterval(() => setSeconds(new Date().getTime()), 1000)
  }, [])

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

  function openTask(task) {
    localStorage.setItem('task', JSON.stringify(task))
    history.push('/task')
  }

  function onLogout() {
    localStorage.clear()
    history.push('/')
  }

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