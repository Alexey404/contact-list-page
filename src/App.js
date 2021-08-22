import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { Login } from './page/login'
import { EnhancedTable } from './page/pageContacts'

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [login, setLogin] = useState([{ login: 'admin', password: 'admin' }])

  const loginHendler = value => {
    login.map(e =>
      e.login === value.login && e.password === value.password
        ? authorization()
        : ''
    )
  }

  const authorization = () => {
    setIsLogin(true)
    window.localStorage.setItem('auth', true)
  }
  const authorizationOff = () => {
    setIsLogin(false)
    window.localStorage.removeItem('auth')
  }

  useEffect(() => {
    setIsLogin(window.localStorage.getItem('auth'))
  }, [])

  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Login loginHendler={loginHendler} isLogin={isLogin} />
          </Route>
          <Route path='/contacts'>
            <EnhancedTable
              isLogin={isLogin}
              authorizationOff={authorizationOff}
            />
          </Route>
          <Route path='*' render={() => <div>404 Not definde</div>} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
