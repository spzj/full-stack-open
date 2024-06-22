import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './providers/NotificationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
)
