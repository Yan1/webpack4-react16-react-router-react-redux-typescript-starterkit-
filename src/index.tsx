import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'

import { Provider } from 'react-redux'
import store from './store/index'

import './index.less'

const rootElement = document.getElementById('root')
ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  rootElement
)
