import './App.css'
import './config/connection'
import { Login, Register } from './auth/index'
import { BrowserRouter, Route, Routes } from 'react-router'

function App() {


  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
