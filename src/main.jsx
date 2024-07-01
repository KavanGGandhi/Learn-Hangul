import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { hangulCharacters } from './constants'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App questions={hangulCharacters.questions} />
  </React.StrictMode>,
)
