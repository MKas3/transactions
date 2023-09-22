import { createBrowserRouter } from 'react-router-dom';
import Layout from '../pages/Layout.tsx';
import ErrorPage from '../pages/ErrorPage.tsx';
import Transactions from '../pages/Transactions.tsx';
import Categories from '../pages/Categories.tsx';
import Auth from '../pages/Auth.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Transactions />,
      },
      {
        path: 'transactions',
        element: <Transactions />,
      },
      {
        path: 'categories',
        element: <Categories />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },
]);
