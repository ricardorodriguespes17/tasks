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

//Funcao retorna o componente da tela da Tarefa selecionada
export default function Task() {

  //Recupera do local storage a task selecionada
  const task = JSON.parse(localStorage.getItem('task'))
  //Recupera o id do usuario logado
  const userId = localStorage.getItem('userId')
  //Recebe o tempo da tarefa
  const [time, setTime] = useState('')
  //Um parametro para indicar mudanca a cada segundo
  const [second, setSecond] = useState(0)
  //Um parametro para indicar que a aplicacao esta carregando
  const [loading, setLoading] = useState(false)
  //Recebe o id da tarefa
  const [id] = useState(task.id)
  //Recebe o titulo da tarefa
  const [title, setTitle] = useState(task.title)
  //Recebe a descricao da tarefa
  const [description, setDescription] = useState(task.description)
  //Recebe o status da tarefa
  const [status, setStatus] = useState(task.status)
  //Recebe o tempo de inicio da tarefa
  const [startedIn, setStartedIn] = useState(task.startedIn)
  //Recebe o tempo de finalizacao da tarefa
  const [finishedIn, setFinishedIn] = useState(task.finishedIn)
  //Verifica se a tela tem no minimo 1000px de largura
  const isNormal = useMediaQuery({ minWidth: 800 })
  //Inicia o history para manipular as rotas
  const history = useHistory()

  //Muda a variavel second a cada segundo para indicar atualizacao do tempo
  useEffect(() => {
    setInterval(() => setSecond(new Date().getTime()), 1000)
  }, [])

  //Atualiza o tempo da tarefa a cada 1000ms (1 segundo)
  useEffect(() => {
    if (!loading) {
      setTime(taskTime(
        status,
        startedIn === null ? '' : startedIn,
        finishedIn === null ? '' : finishedIn
      ))
    }
  }, [second, status, startedIn, finishedIn, loading])

  //Funcao chamada para iniciar o cronometro da tarefa
  function onStart() {
    if (status === 'started')
      return

    if (status !== 'no-started') {
      onRestart()
      return
    }

    update(
      'started',
      new Date().toISOString(),
      null
    )
  }

  //Funcao chamada para parar o cronometro da tarefa
  function onStop() {
    if (status === 'paused')
      return

    update(
      'paused',
      startedIn,
      new Date().toISOString()
    )
  }

  //Funcao chamada para retormar o cronometro da tarefa
  function onRestart() {
    if (status === 'restarted')
      return

    var start = new Date(startedIn) - new Date(finishedIn) + new Date().getTime()

    update(
      'restarted',
      new Date(start).toISOString(),
      null
    )
  }

  //Funcao chamada para concluir a tarefa
  function onFinish() {
    if (status === 'finished')
      return

    update(
      'finished',
      startedIn,
      new Date().toISOString()
    )

    history.push('/main')
  }

  //Funcao para atualizar o tempo da tarefa no banco de dados
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

  //Funcao chamada para salvar os dados editaveis da tarefa (titulo e descricao)
  async function saveData() {
    setLoading(true)

    await api.put(`tasks/${id}`, {
      title,
      description,
      status,
      startedIn,
      finishedIn,
    }, {
      headers: {
        authorization: userId
      }
    })
    .then(res => {
      alert('Salvo com sucesso!')
    })

    setLoading(false)
  }

  //Retorna o JSX
  return (
    <div className={`task-container${isNormal ? '' : '-small'}`} >
      <header>
        <Link to='/main'>
          <BackIcon size={36} color='#87CEFA' />
        </Link>
        <input
          value={title}
          onChange={event => setTitle(event.target.value)} />
        <button 
          disabled={loading}
          onClick={saveData}>
          <text>Salvar alterações</text>
        </button>
      </header>
      <div className="sub-header">
        <div className="time-box">
          <ClockIcon size={28} color='#222' />
          <text className="time-text">{time}</text>
        </div>
        <button
          disabled={loading}
          className="button-finish"
          onClick={onFinish} >
          <text>Concluir tarefa</text>
        </button>
      </div>
      <div className="description-box">
        <textarea
          value={description}
          onChange={event => setDescription(event.target.value)} />
      </div>
      <div className="buttons-box">
        <button
          disabled={loading}
          className="button-start"
          onClick={onStart} >
          <text>Iniciar</text>
        </button>
        <button
          disabled={loading}
          className="button-stop"
          onClick={onStop} >
          <text>Parar</text>
        </button>
      </div>
    </div>
  )
}
