import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Profile } from '../auth'
import { Login, Profile, Register } from '../auth/index'
import AuthGuard from './guards/authGuard'
import Dashboard from '../pages/dashboard'
import DashboardLayout from '../components/layout/dashboardLayout'
import ProductList from '../components/products/productList'
import AddProduct from '../pages/products/addProduct'


function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />

                    {/* Protected Route */}
                    <Route
                        path='/dashboard'
                        element={
                            <AuthGuard>
                                <DashboardLayout />
                            </AuthGuard>
                        }
                    >
                        <Route index element={<Dashboard />} />
                        <Route path='profile' element={<Profile />} />
                        <Route path='products' element={<ProductList />} />
                        <Route path='products/add' element={<AddProduct />} />
                        <Route path="products/edit/:id" element={<AddProduct />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
