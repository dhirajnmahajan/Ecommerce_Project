import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addUser } from '../api/users'
import { useNavigate } from 'react-router'

function RegisterUser() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: ''

    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        try {
            e.preventDefault()

            const response = await addUser(formData)
            if (response?.success) {
                window.alert(response.message)
            }
            navigate('/login')

        } catch (err) {
            console.log('error', err);
            window.alert(err?.message)

        }

    }
    return (
        <Box
            sx={{
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100%',
                width: '100%',
            }}
        >
            <Paper
                component="form"
                onSubmit={handleSubmit}
                elevation={8}
                sx={{
                    p: { xs: 3, md: 6 },
                    maxWidth: 400,
                    width: '100%',
                    textAlign: 'center',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>

                </Box>
                <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Sign Up
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Access your account with your credentials
                </Typography>

                <div className='grid grid-cols-12'>
                    <div className='grid col-span-6'>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="First Name"
                            type="text"
                            id="fname"
                            autoComplete="name"
                            variant="outlined"
                            value={formData.firstname}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                firstname: e.target.value
                            }))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Last Name"
                            type="text"
                            id="lname"
                            autoComplete="name"
                            variant="outlined"
                            value={formData.lastname}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                lastname: e.target.value
                            }))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email"
                            type="text"
                            id="email"
                            autoComplete="email"
                            variant="outlined"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                email: e.target.value
                            }))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Phone Number"
                            type="text"
                            id="phone"
                            autoComplete="phone"
                            variant="outlined"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                phoneNumber: e.target.value
                            }))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            id="pass"
                            autoComplete="pass"
                            variant="outlined"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({
                                ...prev,
                                password: e.target.value
                            }))}
                        />
                    </div>
                </div>
                <Box>
                    {/* <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
                        Forgot password?
                    </Link> */}
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                // sx={{ mt: 3, mb: 2, py: 1.5, boxShadow: theme.shadows[4] }}
                // onClick={navigate('/login')}
                >
                    Sign Up
                </Button>

                <Link href="/login" variant="body2" color="text.secondary"
                >
                    {'I have a account? Sign In'}
                </Link>
            </Paper>
        </Box>
    )
}

export default RegisterUser
