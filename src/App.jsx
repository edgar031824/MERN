import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Project from './components/projects';
import Account from './components/auth0/account';
import Login from './components/auth0/login';
import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/HOC/privateRoute';

//check if there is a token, to update the baseUrl request and append the toker in the header
const token = localStorage.getItem('token');

if (token) {
  tokenAuth(token);
}

function App() {
  return (
    < AlertState >
      <ProjectState>
        <TaskState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login}></Route>
                <Route exact path='/new-account' component={Account}></Route>
                <PrivateRoute exact path='/projects' component={Project} ble='true'></PrivateRoute>
              </Switch>
            </Router>
          </AuthState>
        </TaskState>
      </ProjectState>
    </AlertState >
  );
}

export default App;
