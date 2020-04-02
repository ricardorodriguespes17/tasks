import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import {
  MdAccessAlarm as ClockIcon,
} from 'react-icons/md'

import taskTime from '../../utils/taskTime'

import './styles.css'

import api from '../../services/api'

export default function TaskItem({ task, openTask, type }) {

  const [time, setTime] = useState('')

  const userId = localStorage.getItem('userId')

  const history = useHistory()

  useEffect(() => {
    setTime(taskTime(
      task.status,
      task.startedIn === null ? '' : task.startedIn,
      task.finishedIn === null ? '' : task.finishedIn
    ))

    setInterval(() => setTime(taskTime(
      task.status,
      task.startedIn === null ? '' : task.startedIn,
      task.finishedIn === null ? '' : task.finishedIn
    )), 1000)
  }, [task])

  function onRestart() {
    api.put(`tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: 'started',
      startedIn: new Date().toISOString(),
      finishedIn: null
    }, {
      headers: {
        authorization: userId
      }
    })

    history.push('/main')
  }

  return (
    <li id={task.id} onClick={() => type === 'active' ? openTask(task) : null} className={type === 'active' ? 'task-grid' : 'task-list'} >
      <div className="title-task">
        <text className="title">{task.title}</text>
      </div>
      <div className="description-task-box">
        <text>{task.description}</text>
      </div>
      <div className="time-task-box">
        <ClockIcon size={32} color='#222' />
        <text>{time}</text>
      </div>
      {type === 'finisheds' ? (
        <button onClick={onRestart}>
          <text>Reabrir tarefa</text>
        </button>
      ) : null}
    </li>
  )
}