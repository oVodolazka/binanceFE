import './App.css';
import React from 'react';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { ThemeProvider } from '@mui/material/styles';
import AuthProvider from './components/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Dashboard from './pages/Dashboard';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
