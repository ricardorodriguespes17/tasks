import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Task from './pages/Task'
import TaskFinisheds from './pages/TaskFinisheds'
import ProtectPage from './components/ProtectPage'

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/signup' component={Signup} />
                <ProtectPage path='/main'>
                    <Main />
                </ProtectPage>
                <ProtectPage path='/task'>
                    <Task />
                </ProtectPage>
                <ProtectPage path='/finisheds'>
                    <TaskFinisheds />
                </ProtectPage>
            </Switch>
        </Router>
    )
}