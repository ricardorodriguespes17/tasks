import React, { useState } from 'react'
import { Drawer, ListItem, List } from '@material-ui/core'
import { useHistory } from 'react-router'

import './styles.css'

import api from '../../services/api'

//Funcao retorna uma gaveta vertical vinda de baixo com o formulario para adicionar nova tarefa
export default function DrawerNavigation({ open, close }) {
  //Recupera o id do usuario logado
  const userId = localStorage.getItem('userId')
  //Inicia o history para manipulacao das rotas
  const history = useHistory()
  //Recebe o titulo da nova tarefa digitado pelo usuario
  const [title, setTitle] = useState('')
  //Recebe a descricao da nova tarefa digitada pelo usuario
  const [description, setDescription] = useState('')

  //Funcao chamada para adicionar uma nova tarefa
  async function onAddTask(event) {
    //Previne o recarregamento da pagina
    event.preventDefault()
    //Realiza a requisicao ao servidor, pondo os dados da nova tarefa
    api.post('tasks', {
      title,
      description
    }, {
      headers: {
        authorization: userId
      }
    })
      .then(res => {
        //Caso de certo
        alert('Tarefa adicionada')
        history.go('/main')
      })
      .catch(err => {
        //Caso de erro
        var msg = err.response.data.error
        if (err.response.data.error === 'Bad Request') { msg = 'Insira os dados corretamente' }
        alert(msg)
      })
  }

  //Retorna o JSX
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