import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'

import {
  MdArrowBack as BackIcon,
  MdAccessAlarm as ClockIcon
} from 'react-icons/md'

import './styles.css'

import taskTime from '../../utils/taskTime'

import { useHistory } from 'react-router-dom'
import api from '../../services/api'

export default function Task() {

  const task = JSON.parse(localStorage.getItem('task'))

  const userId = localStorage.getItem('userId')

  const [time, setTime] = useState('')
  const [second, setSecond] = useState(0)
  const [loading, setLoading] = useState(false)
  const [id] = useState(task.id)
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description)
  const [status, setStatus] = useState(task.status)
  const [startedIn, setStartedIn] = useState(task.startedIn)
  const [finishedIn, setFinishedIn] = useState(task.finishedIn)

  const isNormal = useMediaQuery({ minWidth: 800 })

  const history = useHistory()

  useEffect(() => {
    setInterval(() => setSecond(new Date().getTime()), 1000)
  }, [])

  useEffect(() => {
    if (!loading) {
      setTime(taskTime(
        status,
        startedIn === null ? '' : startedIn,
        finishedIn === null ? '' : finishedIn
      ))
    }
  }, [second, status, startedIn, finishedIn, loading])

  function onStart() {
    if(status === 'started')
      return

    if(status !== 'no-started'){
      onRestart()
      return
    }

    update(
      'started',
      new Date().toISOString(),
      null
    )
  }

  function onStop() {
    if(status === 'paused')
      return

    update(
      'paused',
      startedIn,
      new Date().toISOString()
    )
  }

  function onRestart() {
    if(status === 'restarted')
      return

    var start = new Date(startedIn) - new Date(finishedIn) + new Date().getTime()

    update(
      'restarted',
      new Date(start).toISOString(),
      null
    )
  }

  function onFinish() {
    if(status === 'finished')
      return

    update(
      'finished',
      startedIn,
      new Date().toISOString()
    )

    history.push('/main')
  }

  async function update(status, startedIn, finishedIn) {
    setLoading(true)

    await api.put(`tasks/${id}`, {
      title,
      description,
      status,
      startedIn,
      finishedIn
    }, {
      headers: {
        authorization: userId
      }
    })
      .then(res => {
        var task = res.data
        localStorage.setItem('task', JSON.stringify(task))
        setTitle(task.title)
        setDescription(task.description)
        setStatus(task.status)
        setStartedIn(task.startedIn)
        setFinishedIn(task.finishedIn)
      })
      .catch(err => {
        console.log(err)
        switch (status) {
          case 'started':
            alert('Erro ao iniciar a tarefa')
            break
          case 'paused':
            alert('Erro ao pausar a tarefa')
            break
          case 'restarted':
            alert('Erro ao reiniciar a tarefa')
            break
          case 'finished':
            alert('Erro ao concluir a tarefa')
            break
          default:
            alert('Erro!')
            break
        }
      })

    setLoading(false)
  }

  return (
    <div className={`task-container${isNormal ? '' : '-small'}`} >
      <header>
        <Link to='/main'>
          <BackIcon size={36} color='#87CEFA' />
        </Link>
        <text className="title">{title}</text>
      </header>
      <div className="sub-header">
        <div className="time-box">
          <ClockIcon size={28} color='#222' />
          <text className="time-text">{time}</text>
        </div>
        <button
          className="button-finish"
          onClick={onFinish} >
          <text>Concluir tarefa</text>
        </button>
      </div>
      <div className="description-box">
        <text>{description}</text>
      </div>
      <div className="buttons-box">
        <button
          className="button-start"
          onClick={onStart} >
          <text>Iniciar</text>
        </button>
        <button
            className="button-stop"
            onClick={onStop} >
            <text>Stop</text>
          </button>
      </div>
    </div>
  )
}
