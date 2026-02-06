import React from 'react'
import { useContext, useEffect, useMemo } from "react";
import { AuthContext } from './context/auth-context';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controler } from "../components";
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';

function Profile() {
    const { user } = useContext(AuthContext)

    const profileSchema = Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        email: Yup.string().email('incorrect email format').required('Email is required'),
        phoneNumber: Yup.string().required('Phone number is required')
    });

    const defaultValues = useMemo(() => ({
        firstname: user?.firstname || '',
        lastname: user?.lastname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || ''
    }), [user]);

    const methods = useForm({
        resolver: yupResolver(profileSchema),
        defaultValues
    });

    const {
        reset,
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = methods;

    const onSubmit = handleSubmit(async (data) => {
        console.log('data to be submitted :', data);
    })

    useEffect(() => {
        if (user) {
            reset(defaultValues);
        }
    }, [user, defaultValues, reset]);

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" mb={3}>
                    Profile
                </Typography>

                <form onSubmit={onSubmit} >

                    {/* main container grid */}
                    <Grid container spacing={4} >

                        {/* left side art  grid item  */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <Stack alignItems="center" spacing={2}>
                                <Avatar sx={{ height: 140, width: 140 }} />
                                <Typography variant='caption'>
                                    JPG, PNG , GIF allowed
                                </Typography>

                                <Button variant="outlined" component="label">
                                    Upload Picture
                                    <input type="file"
                                        hidden
                                        accept="image/*"
                                    />
                                </Button>
                            </Stack>
                        </Grid>
                        {/* Right side part grid item */}
                        <Grid item size={{ xs: 12, sm: 6 }}>

                            {/* inner parent grid */}
                            <Grid container spacing={2}>

                                {/* left inner grid part */}
                                <Grid item spacing={2} size={{ xs: 12, sm: 6 }}>
                                    <Controler name="firstname" label="First Name" control={control} />
                                </Grid>
                                {/* left inner grid part */}
                                <Grid item spacing={2} size={{ xs: 12, sm: 6 }}>
                                    <Controler name="lastname" label="Last Name" control={control} />
                                </Grid>
                                {/* left inner grid part */}
                                <Grid item spacing={2} size={{ xs: 12, sm: 6 }}>
                                    <Controler disabled name="email" label="Email" control={control} />
                                </Grid> {/* left inner grid part */}
                                <Grid item spacing={2} size={{ xs: 12, sm: 6 }}>
                                    <Controler disabled name="phoneNumber" label="Phone Number" control={control} />
                                </Grid>

                            </Grid>

                            <Grid item size={{ xs: 12, md: 12 }} sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    variant="contained"
                                    loading={isSubmitting}
                                    type="submit"
                                    color='primary'
                                >Update</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                </form>
            </Paper>
        </Box >
    )
}

export default Profile
