import './App.css';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from './components/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './theme';
import { AppLayout } from './components/AppLayout';
import Integration from './pages/IntegrationPage';
import DepositPage from './pages/DepositPage';
import React from 'react';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
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
                path="/depositpage"
                exact
                element={(
                  <PrivateRoute >
                    <DepositPage />
                  </PrivateRoute>
                )}
              />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;