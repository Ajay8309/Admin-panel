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
// import {Login, Signup, ProductList, ProductDetails, Cart, 
  // Wishlist, Profile, Checkout, Order, OrderDetails, LandingPage} from './pages'
// import Layout from './layout/layout';
// import ProtectedRoute from "./routes/protected.route"


const App = () => {
  return (
    <BrowserRouter>  
    <Routes>
    <Route path="/login" element = {<Login/>}/>
    <Route path="/edit/:id" element = {<UserEdit/>}/>
    <Route path="/orders" element = {<Orders/>}/>
    <Route path="/products" element = {<Products/>}/>
    <Route path='/' element={<User/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App