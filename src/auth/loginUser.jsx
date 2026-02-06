import React, { useContext } from 'react'
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import { AuthContext } from './context/auth-context'
import { useNavigate } from 'react-router'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { Controler } from '../components'


function LoginUser() {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    // const [formData, setFormData] = useState()

    const loginSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required !"),
        password: Yup.string().required("Password is required")
    });

    const defaultValues = {
        email: "",
        password: ""
    };

    const method = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues
    });

    const { control, handleSubmit, formState: { isSubmitting } } = method;

    const onSubmit = handleSubmit(async (data) => {
        try {
            await loginUser?.(data)
            alert('Login successfull')
            navigate('/profile', { replace: true })

        } catch (error) {
            console.error(error);
            alert(error)
        }
    })



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await loginUser?.(formData)
    //         alert('Login successfull')
    //         navigate('/header', { replace: true })
    //     } catch (error) {
    //         console.error(error);
    //         alert(error)
    //     }
    // }


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
                onSubmit={onSubmit}
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

                {/* <TextField
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
                /> */}

                <Controler name={'email'} label={'email'} type={'email'} control={control} />
                <Controler name={'password'} label={'password'} type={'password'} control={control} />

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
                    loading={isSubmitting}
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
