import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './pages/GettingStarted';
import Login from './pages/Login';
import Register from './pages/Register';

import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import Payment from './pages/Payment';
import NewUser from './pages/NewUser';

import AuthRequire from './pages/AuthRequire';
import AuthProvider from './context/AuthProvider';
import PageNotFound from './pages/PageNotFound';
import TempPreference from './pages/TempPreference';
import AuthLayout from './pages/AuthLayout';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<AuthLayout />}>
                <Route index element={<GettingStarted />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />
              </Route>

              <Route
                element={
                  <AuthRequire allowedRoles={['user', 'admin', 'qha']} />
                }
              >
                <Route path={'/home'} element={<Home />} />
                <Route path={'/dashboard'} element={<Dashboard />} />
                <Route path={'/journey'} element={<Journey />} />
                <Route path={'/payment'} element={<Payment />} />
                <Route path={'/newUser'} element={<NewUser />} />
                <Route path={'/preference'} element={<TempPreference />} />
              </Route>

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
