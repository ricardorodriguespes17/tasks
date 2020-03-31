import React from 'react'
import { Link } from 'react-router-dom'
import { Drawer, ListItem, List } from '@material-ui/core'

import {
  MdAssignment as TasksIcon,
  MdDone as FinishedsIcon,
  MdDeleteForever as TrashIcon
} from 'react-icons/md'

export default function DrawerNavigation({ open, close }) {
  return (
    <Drawer anchor='left' open={open} onClose={() => close(false)}>
      <List>
        <ListItem>
          <Link to='/main' onClick={() => close(false)} className="link-drawer">
            <TasksIcon size={28} color='#222' />
            <text>Tarefas</text>
          </Link>
        </ListItem>
        <ListItem>
          <Link to='/finisheds' className="link-drawer">
            <FinishedsIcon size={28} color='#222' />
            <text>Tarefas concluídas</text>
          </Link>
        </ListItem>
        <ListItem>
          <Link to='/trash' className="link-drawer">
            <TrashIcon size={28} color='#222' />
            <text>Lixeira</text>
          </Link>
        </ListItem>
      </List>
    </Drawer>
  )
}
