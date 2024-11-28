import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Product from './pages/Product'
import Sale from './pages/Sale'
import Voucher from './pages/Voucher'
import VoucherDetails from './pages/VoucherDetails'
import AddNewProduct from './pages/AddNewProduct'
import EditProduct from './pages/EditProduct'
import Login from './pages/Login'
import Register from './pages/Register'
import UserProfile from './pages/UserProfile'
import UserProfileChangeName from './pages/UserProfileChangeName'
import UserProfileChangePassword from './pages/UserProfileChangePassword'
import UserProfileChangeImage from './pages/UserProfileChangeImage'

const router = createBrowserRouter([
    {
        
        path:'/',
        errorElement:<Error/>,
        children:[
            {
                index: true,
                element:<Login/>,
            },
            {
                path:'register',
                element:<Register/>
            },
            {
                path: 'dashboard',
                element: <Layout/>,
                children: [
                    {
                        index: true,
                        element: <Dashboard/>
                    },
                    {
                        path: 'product',
                        element: <Product/>
                    },
                    {
                        path: 'product/add-new-product',
                        element: <AddNewProduct/>
                    },
                    {
                        path: 'product/edit-product/:id',
                        element: <EditProduct/>
                    },
                    {
                        path: 'sale',
                        element: <Sale/>
                    },
                    {
                        path: 'voucher',
                        element: <Voucher/>
                    },
                    {
                        path: 'voucher/voucherDetails/:id',
                        element: <VoucherDetails/>
                    },
                    {
                        path: 'user-profile',
                        children:[
                            {   index:true,
                                element: <UserProfile/>,
                            },
                            {   path:'user-change-name',
                                element: <UserProfileChangeName/>,
                            },
                            {   path:'user-change-password',
                                element: <UserProfileChangePassword/>,
                            },
                            {   path:'user-change-image',
                                element: <UserProfileChangeImage/>,
                            },
                        ]
                    },
                ]
            }
        ]
        


    }
])

export default router