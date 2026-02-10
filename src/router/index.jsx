import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { Profile } from '../auth'
import { Login, Profile, Register } from '../auth/index'
import AuthGuard from './guards/authGuard'
import Dashboard from '../pages/dashboard'
import DashboardLayout from '../components/layout/dashboardLayout'
import ProductList from '../components/products/productList'
import AddProduct from '../pages/products/addProduct'
import ProfileCard from '../components/layout/profileCard'
import ChangePassword from '../auth/changePassword'
// import ProfileMenu from '../components/layout/profileMenu'


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
                        <Route path='profilecard' element={<ProfileCard />} />
                        <Route path='profilecard/edit' element={<Profile />} />
                        <Route path='profilecard/password' element={<ChangePassword />} />
                        {/* <Route path='profile/card/edit' element={<ProfileMenu />} /> */}
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
