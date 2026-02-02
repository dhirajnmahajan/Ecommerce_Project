import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from '../pages/index'
import { Login, Register } from '../auth/index'
import { Header } from '../components/index'


function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/header" element={<Header />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
