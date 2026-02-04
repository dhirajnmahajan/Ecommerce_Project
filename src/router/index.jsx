import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from '../pages/index'
import { Login, Register } from '../auth/index'
import AuthGuard from './guards/authGuard'
import { Header } from '../components'


function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/auth/login" element={<Login />} />
                    <Route path="/auth/register" element={<Register />} />
                    <Route path="/header" element={
                        <AuthGuard>
                            <Header />
                        </AuthGuard>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
