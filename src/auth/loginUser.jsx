import React, { useContext, useState } from 'react'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import { AuthContext } from './context/auth-context'
import { useNavigate } from 'react-router'

function LoginUser() {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser?.(formData)
            alert('Login successfull')
            navigate('/header', { replace: true })

        } catch (error) {
            console.error(error);
            alert(error)
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
                    //   backgroundColor: 'background.paper',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {/* <LockOpenIcon sx={{ fontSize: 40, color: 'primary.main' }} /> */}
                </Box>
                <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
                    Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Access your account with your credentials
                </Typography>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    variant="outlined"
                    //   value={email}
                    onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        email: e.target.value
                    }))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                    //   value={password}
                    onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        password: e.target.value
                    }))}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        my: 1,
                    }}
                >
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                // sx={{ mt: 3, mb: 2, py: 1.5, boxShadow: theme.shadows[4] }}
                >
                    Sign In
                </Button>

                <Link href="/auth/register" variant="body2" color="text.secondary">
                    {'Don\'t have an account? Sign Up'}
                </Link>
            </Paper>
        </Box>
    )
}

export default LoginUser
