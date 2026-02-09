import { Box, Typography } from '@mui/material'
import React, { useContext } from 'react'
import ProductList from '../components/products/productList'
// import { products } from '../data/products'
import { AuthContext } from '../auth/context/auth-context'

function Dashboard() {
    const { user } = useContext(AuthContext)
    return (
        <>
            <Box>
                <Typography variant='h5' mb={3} color='text.secondary'>
                    DashBoard
                </Typography>
                <Typography>
                    Hello {user.firstname}
                </Typography>
                {/* <ProductList products={products} /> */}
            </Box>
        </>

    )
}

export default Dashboard
