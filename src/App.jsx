import React from 'react';
import { Landing, Error, Register, ProtectedRoute } from './pages';
import {
  Dashboard,
  Statistics,
  AllJobs,
  AddJob,
  Profile,
} from './pages/Dashboard';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Statistics />,
        },
        {
          path: 'all-jobs',
          element: <AllJobs />,
        },
        {
          path: 'add-job',
          element: <AddJob />,
        },
        {
          path: 'profile',
          element: <Profile />,
        },
      ],
    },
    {
      path: 'landing',
      element: <Landing />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
