import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const router = routerMiddleware(browserHistory)

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(thunk, router))
  return store
}
