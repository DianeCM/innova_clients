import React from 'react';
import Home from './pages/home'
import Login from './pages/login';
import Register from './pages/signup';
import ClientConsult from './pages/customes-list';
import Layout from './pages/layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import ClientMaintenance from './pages/customers-details';
import Error from './pages/error';
import { GlobalProvider, useGlobalContext } from './context/app-context';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import { NotificationProvider } from './hooks/notification-context';

const AppRoutes = () => {
  const { state } = useGlobalContext()
  return (
    <Routes>
      {state.isLogged ?
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="customers" element={<ClientConsult />} />
          <Route path="customers/management" element={<ClientMaintenance />} />
          <Route path="*" element={<Error />} />
        </Route>
        :
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </>

      }
    </Routes>)
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <GlobalProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <AppRoutes />
          </BrowserRouter>
        </GlobalProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
