import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Profile } from '../auth'
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
                    <Route path='/profile' element={
                        <AuthGuard>
                            <Header>
                                < Profile />
                            </Header>
                        </AuthGuard>
                    }
                    />
                    {/* <Route path="/header" element={
                        
                    } /> */}
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router
