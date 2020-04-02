import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Signup from './pages/Signup'
import Main from './pages/Main'
import Task from './pages/Task'
import TaskFinisheds from './pages/TaskFinisheds'

export default function Routes(){
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/signup' component={Signup} />
                <Route path='/main' component={Main} />
                <Route path='/task' component={Task} />
                <Route path='/finisheds' component={TaskFinisheds} />
            </Switch>
        </Router>
    )
}