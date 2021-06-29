import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import { userActions } from '../src/_actions'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// class App extends Component {
const App = () => {
  const token = useSelector((state) => state.users.token)
  const dispatch = useDispatch()

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem('user'))?.token

    if (token !== null && token !== '') {
      dispatch(userActions.UpdateToken(token))
    }
  }, [])

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          {token === '' || token === undefined ? (
            <div>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route path="/" name="Đăng nhập" render={(props) => <Login {...props} />} />
            </div>
          ) : (
            <Route path="/" name="Trang chủ" render={(props) => <DefaultLayout {...props} />} />
          )}
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
