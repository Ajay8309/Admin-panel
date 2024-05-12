import React, { Profiler } from 'react'
import { Suspense } from 'react'
// import Spinner from "./components/Spinner/Spinner";
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/Login/Login'
import User from './pages/User/User'
import Orders from './pages/Orders/Orders'
import Products from './pages/Products/Products'
import UserEdit from './pages/UserEdit/UserEdit'
import ProductEdit from './pages/ProductEdit/ProductEdit'
import AddProduct from './pages/AddProduct/AddProduct'
import Spinner from './components/Spinner/Spinner'
// import {Login, Signup, ProductList, ProductDetails, Cart, 
  // Wishlist, Profile, Checkout, Order, OrderDetails, LandingPage} from './pages'
import Layout from './layout/layout';
// import ProtectedRoute from "./routes/protected.route"


const App = () => {
  return (
    <BrowserRouter>  
     <Suspense
        fallback={    
          <Layout>
            <Spinner size={100} />
           </Layout>
        }
      ></Suspense>
         <Toaster position="top-right" />
    <Routes>
    <Route path="/login" element = {<Login/>}/>
    <Route path="/edit/:id" element = {<UserEdit/>}/>
    <Route path="/edit-product/:id" element = {<ProductEdit/>}/>
    <Route path="/orders" element = {<Orders/>}/>
    <Route path="/products" element = {<Products/>}/>
    <Route path='/' element={<User/>}/>
    {/* route for adding new Product */}
    <Route path="/add-product" element={<AddProduct/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App