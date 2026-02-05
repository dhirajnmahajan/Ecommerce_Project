import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { AuthContext } from './context/auth-context'
import { useNavigate } from 'react-router'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controler } from '../components';

function RegisterUser() {

    const { addUser } = useContext(AuthContext);
    const navigate = useNavigate()



    const registerSchema = yup.object().shape({
        firstname: yup.string().required("First name is required"),
        lastname: yup.string().required("Last name is required"),
        email: yup.string().email("Invalid email format").required("email is required"),
        phoneNumber: yup.string().required("phone is required"),
        password: yup.string().required("password is required")
    })

    const defaultValues = {
        firstname: '',
        lastname: '',
        email: '',
        phoneNumber: '',
        password: ''
    }

    const method = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues
    })

    const { control, handleSubmit, formState: { isSubmitting } } = method;

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await addUser(data)
            // console.log(response);
            if (response) {
                window.alert("Registeration Successfull")
                navigate('/auth/login', { replace: true })
            }
        } catch (error) {
            console.log('error', error);

            window.alert(error?.message)
        }

    })


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

                        <Controler name={'firstname'} label={'First Name'} type={'text'} control={control} />
                        <Controler name={'lastname'} label={'Last Name'} type={'text'} control={control} />
                        <Controler name={'email'} label={'Email'} type={'text'} control={control} />
                        <Controler name={'phoneNumber'} label={'Phone Number'} type={'number'} control={control} />
                        <Controler name={'password'} label={'Password'} type={'password'} control={control} />

                        {/* <TextField
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
                        /> */}


                    </div>
                </div>
                <Box>
                    {/* <Link href="#" variant="body2" sx={{ color: 'primary.main' }}>
                        Forgot password?
                    </Link> */}
                </Box>

                <Button
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                    variant="contained"
                    size="large"
                // sx={{ mt: 3, mb: 2, py: 1.5, boxShadow: theme.shadows[4] }}
                // onClick={navigate('/login')}
                >
                    Sign Up
                </Button>

                <Link href="/auth/login" variant="body2" color="text.secondary"
                >
                    {'I have a account? Sign In'}
                </Link>
            </Paper>
        </Box>
    )
}

export default RegisterUser
