import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import AuthFilter from './components/AuthFilter';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './theme';
import { AppLayout } from './components/AppLayout';
import Integration from './pages/IntegrationPage';
import React from 'react';
import Deposit from './pages/DepositPage';
import DepositHistory from './pages/DepositHistory';
import WithdrawHistory from './pages/WithdrawHistory';
import GoogleAuth from './pages/GoogleAuth';
import Profile from './pages/Profile';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthFilter>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route
                path="/login"
                exact
                element={(
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                )}
              />
              <Route
                path="/google-login"
                exact
                element={(
                  <PublicRoute>
                    <GoogleAuth />
                  </PublicRoute>
                )}
              />
              <Route
                path="/registration"
                exact
                element={(
                  <PublicRoute >
                    <RegistrationPage />
                  </PublicRoute>
                )}
              />
              <Route
                path="/dashboard"
                exact
                element={(
                  <PrivateRoute >
                    <Dashboard />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/integration"
                exact
                element={(
                  <PrivateRoute >
                    <Integration />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/deposit"
                exact
                element={(
                  <PrivateRoute >
                    <Deposit />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/deposit-history"
                exact
                element={(
                  <PrivateRoute >
                    <DepositHistory />
                  </PrivateRoute>
                )}
              />
              <Route
                path="/withdraw-history"
                exact
                element={(
                  <PrivateRoute >
                    <WithdrawHistory />
                  </PrivateRoute>
                )}
              />
               <Route
                path="/profile"
                exact
                element={(
                  <PrivateRoute >
                    <Profile />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthFilter>
    </ThemeProvider>
  );
}

export default App;