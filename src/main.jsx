// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout.jsx';

// Pages
import MainPage from './features/Main/MainPage.jsx';
import TimerPage from './features/Time/TimerPage.jsx';
import AuthPage from './features/Login/pages/AuthPage.jsx';
import ForgotPasswordPage from './features/login/pages/ForgotPasswordPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/auth',
        element: <AuthPage />,
        children: [{ path: 'forgot-password', element: <ForgotPasswordPage /> }],
      },
      {
        path: '/timer', // 경로 수정 가능
        element: <TimerPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
