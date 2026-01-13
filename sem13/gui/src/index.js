import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import { Provider } from 'react-redux'
import store from './stores/store'

const container=document.getElementById('root');
const root=ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)