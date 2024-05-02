import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { ProductProvider } from './context/ProductContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <UserProvider>
      <OrderProvider>
        <ProductProvider>
    <App />
        </ProductProvider>
      </OrderProvider>
     </UserProvider>
  </React.StrictMode>,
)
