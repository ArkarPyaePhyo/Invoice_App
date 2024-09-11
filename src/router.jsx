import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Sale from './pages/Sale'
import Voucher from './pages/Voucher'
import VoucherDetails from './pages/VoucherDetails'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        errorElement:<Error/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: '/product',
                element: <Product/>
            },
            {
                path: '/sale',
                element: <Sale/>
            },
            {
                path: '/voucher',
                element: <Voucher/>
            },
            {
                path: '/voucherDetails',
                element: <VoucherDetails/>
            },
        ],
    },
])

export default router