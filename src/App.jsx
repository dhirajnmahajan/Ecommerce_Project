import './App.css'
import './config/connection'
import Router from './router/index'
import { AuthProvider } from './auth/context'
import ProductProvider from './product-context/productProvider'

function App() {

  return (
    <AuthProvider>
      <ProductProvider>

        <Router />
      </ProductProvider>
    </AuthProvider>
  )
}

export default App
