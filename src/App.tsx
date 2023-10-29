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

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            <Route index element={<GettingStarted />} />

            <Route path={'/login'} element={<Login />} />
            <Route path={'/register'} element={<Register />} />

            <Route element={<AuthRequire />}>
              <Route path={'/home'} element={<Home />} />
              <Route path={'/dashboard'} element={<Dashboard />} />
              <Route path={'/journey'} element={<Journey />} />
              <Route path={'/journey'} element={<Payment />} />
            </Route>

            <Route path={'/newUser'} element={<NewUser />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
