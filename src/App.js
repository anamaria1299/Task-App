import { Route, BrowserRouter} from 'react-router-dom'
import {Registration} from './component/registration'
import {TodoList} from './component/todo-list'
import {TodoApp} from './component/todo-app'
import {Drawer} from './component/drawer'
import {Login} from './component/login'
import React from 'react'
import './App.css'


export class App extends React.Component {

  showPages(isLoggedIn) {

    if(isLoggedIn) {

      return (
        <div>
          <Route path='/login' component={Login}/>
          <Route path='/app' component={Drawer}/>
          <Route path='/new' component={Drawer}/>
          <Route path='/cards' component={Drawer}/>
          <Route path='/new' component={TodoApp}/>
          <Route path='/cards' component={TodoList} />
        </div>
      )
    }

    return (
        <div>
          <Route path='/login' component={Login}/>
          <Route path='/registration' component={Registration}/>
        </div>
    )
  }

  render() {

    if (localStorage.getItem('isLoggedIn') === undefined) {
      localStorage.setItem('isLoggedIn', false)
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn')

    return (
        <BrowserRouter>
            {this.showPages(isLoggedIn)}
        </BrowserRouter>
    )
  }
}
