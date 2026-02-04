import './App.css'
import './config/connection'
import Router from './router/index'
import { AuthProvider } from './auth/context'

function App() {

  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}

export default App
