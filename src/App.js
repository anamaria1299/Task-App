import * as Navigation from './component/navigation-drawer'
import { Route, BrowserRouter} from 'react-router-dom'
import * as Login from './component/login'
import React from 'react'
import './App.css'


export class App extends React.Component {

  showPages(isLoggedIn) {

    if(isLoggedIn) {

      return (
        <div>
          <Route path='/login' component={Login.default}/>
          <Route path='/home' component={Navigation.default}/>
        </div>
      )
    }

    return (
        <div>
          <Route path='/login' component={Login.default}/>
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
