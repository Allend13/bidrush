import { createStore, applyMiddleware, compose } from 'redux'
import reducers from 'reducers'
import thunk from 'redux-thunk'
// import DevTools from 'components/devtools'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

const router = routerMiddleware(browserHistory)

const enhancer = compose(
  applyMiddleware(thunk, router),
  // DevTools.instrument()
)

export default function configureStore() {
  const store = createStore(reducers, enhancer)

  if (module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(reducers))
  }

  return store
}
