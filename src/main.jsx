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
import ForgotPasswordPage from './features/Login/pages/ForgotPasswordPage.jsx';
import LoginForm from './features/Login/components/LoginForm.jsx';
import RegisterForm from './features/Login/components/RegisterForm.jsx';

import AuthInitializer from './components/AuthInitializer.jsx';

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
        children: [
          { index: true, element: <LoginForm /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
          { path: 'login', element: <LoginForm /> },
          { path: 'register', element: <RegisterForm /> },
        ],
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
    <AuthInitializer />
    <RouterProvider router={router} />
  </StrictMode>
);
