import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import GlobalStyle from './styles/globalStyles.js';
import LoginPage from './pages/LoginPage/index.jsx';
import Navbar from './components/Navbar/index.jsx';
import CreateUserPage from './pages/CreateUserPage/index.jsx';
import ListClientsPage from './pages/ListClientsPage/index.jsx';
import UserDetailsPage from './pages/UserDetailsPage/index.jsx';
import ProtectedRoute from './protectedRoute.jsx';
import UpdateUserPage from './pages/UpdateUserPage/index.jsx';
import ClientHomePage from './pages/ClientHomePage/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        {/* Rota pública */}
        <Route exact path="/" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route
          exact
          path="/create-user"
          element={
            <ProtectedRoute>
              <CreateUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/list-clients"
          element={
            <ProtectedRoute>
              <ListClientsPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user-details/:id"
          element={
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/update-user/:id"
          element={
            <ProtectedRoute>
              <UpdateUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/client-home"
          element={
            <ProtectedRoute>
              <ClientHomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
