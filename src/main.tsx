import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'

const redirectPath = sessionStorage.getItem('redirect')
if (redirectPath) {
  sessionStorage.removeItem('redirect')
  history.replaceState(null, '', redirectPath)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
