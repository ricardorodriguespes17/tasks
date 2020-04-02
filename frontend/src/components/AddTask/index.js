import React, { useState } from 'react'
import { Drawer, ListItem, List } from '@material-ui/core'
import { useHistory } from 'react-router'

import './styles.css'

import api from '../../services/api'

export default function DrawerNavigation({ open, close }) {

  const userId = localStorage.getItem('userId')

  const history = useHistory()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function onAddTask(event) {
    event.preventDefault()

    api.post('tasks', {
      title,
      description
    }, {
      headers: {
        authorization: userId
      }
    })
      .then(res => {
        alert('Tarefa adicionada')
        history.go('/main')
      })
      .catch(err => {
        var msg = err.response.data.error
        if (err.response.data.error === 'Bad Request') { msg = 'Insira os dados corretamente' }
        alert(msg)
      })
  }

  return (
    <Drawer anchor='bottom' open={open} onClose={() => close(false)}>
      <List className="list-drawer">
        <ListItem className="list-item">
          <form>
            <h2>Criar tarefa</h2>
            <text>Título</text>
            <input
              type='text'
              value={title}
              onChange={event => setTitle(event.target.value)} />
            <text>Descrição</text>
            <textarea
              type='text'
              value={description}
              onChange={event => setDescription(event.target.value)} />
            <button onClick={onAddTask}>
              <text>Criar</text>
            </button>
            <button onClick={() => history.push('/main')}>
              <text>
                Cancelar
              </text>
            </button>
          </form>
        </ListItem>
      </List>
    </Drawer>
  )
}