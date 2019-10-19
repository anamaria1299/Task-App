import { Route, BrowserRouter} from 'react-router-dom'
import {BoardList} from './component/board/board-list'
import {Registration} from './component/registration'
import {ListList} from './component/lists/list-list'
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
            <Route path='/boards' component={Drawer}/>
            <Route path='/cards' component={Drawer}/>
            <Route path='/app' component={Drawer}/>
            <Route path='/app' component={BoardList}/>
            <Route path='/new' component={Drawer}/>
            <Route path='/login' component={Login}/>
            <Route path='/new' component={TodoApp}/>
            <Route path='/cards' component={ListList} />
            <Route path="/boards" component={BoardList}/>
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
