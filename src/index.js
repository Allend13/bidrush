import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { replace, syncHistoryWithStore } from 'react-router-redux'
import 'less/master.less'
import configureStore from './store/configureStore'
import { Auth, Login, NotFound } from 'components'
import Routes from './routes'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

const authRedirect = (path) => store.dispatch(replace(path))

render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Auth}>
        {Routes}
      </Route>
      <Route path="/login" authRedirect={authRedirect} component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Router>
  </Provider>,
  document.getElementById('root')
)
