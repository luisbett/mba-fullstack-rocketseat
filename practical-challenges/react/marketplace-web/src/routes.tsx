import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { EditProduct } from './pages/app/products/edit-product'
import { NewProduct } from './pages/app/products/new-product'
import { Products } from './pages/app/products/products'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/new-product',
        element: <NewProduct />,
      },
      {
        path: '/edit-product/:id',
        element: <EditProduct />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/sign-up',
        element: <SignUp />,
      },
    ],
  },
])
