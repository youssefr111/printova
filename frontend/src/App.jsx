import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Account from './pages/Account.jsx';
import Missing from './components/General/Missing';
import useTitle from './hooks/useTitle';
import AppProviders from './context/AppProviders.jsx';
import Maintenance from './pages/Maintenance.jsx';
import Checkout from './pages/Checkout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AuthGuard from "./components/Auth/AuthGuard.jsx";
import RoleProtectedRoute from "./components/Auth/RoleProtectedRoute.jsx";

function App() {
  useTitle('Home | Printova');

  return (
    <AppProviders>
        <Routes>
          <Route path='/' element={<Layout />}>
            
            <Route index element={<Home />} />

            <Route path="login" element={<AuthGuard redirectIfAuthenticated><Login /></AuthGuard>} />

            <Route path="register" element={<AuthGuard redirectIfAuthenticated><Register /></AuthGuard>} />

            <Route path="maintenance" element={<AuthGuard><Maintenance /></AuthGuard>} />

            <Route path="checkout" element={<AuthGuard><Checkout /></AuthGuard>} />

            <Route path="account" element={<AuthGuard><Account /></AuthGuard>} />

            <Route path="/dashboard" element={ <RoleProtectedRoute allowedRoles={["ADMIN", "MANAGER", "DELIVERY", "TECHNICIAN"]}><Dashboard /></RoleProtectedRoute>} />

          </Route>

          <Route path='*' element={<Missing />} />

        </Routes>
    </AppProviders>
  )
}

export default App
