import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { Login } from './Components/Login/Login'
import { EnhancedTable } from './Components/PageContact/PageContacts'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [isAlert, setIsAlert] = useState(true)
  const [login, setLogin] = useState([{ login: 'admin', password: 'admin' }])
  const storage = window.localStorage

  const loginHendler = value => {
    login.map(e =>
      e.login === value.login && e.password === value.password
        ? authorization()
        : ''
    )
    setIsAlert(false)
  }

  const authorization = () => {
    setIsLogin(true)
    storage.setItem('auth', true)
  }

  const authorizationOff = () => {
    setIsLogin(false)
    storage.removeItem('auth')
  }
  useEffect(() => {
    setIsAlert(true)
  }, [isLogin])

  useEffect(() => {
    setIsLogin(storage.getItem('auth'))
  }, [storage])

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Login
              loginHendler={loginHendler}
              isLogin={isLogin}
              isAlert={isAlert}
            />
          </Route>
          <Route path='/contacts'>
            <EnhancedTable
              isLogin={isLogin}
              authorizationOff={authorizationOff}
            />
          </Route>
          <Route path='*'>
            <div>404 Not definde</div>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
