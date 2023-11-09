import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './pages/GettingStarted';
import Login from './pages/Login';
import Register from './pages/Register';

import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Journey from './pages/journey/Journey';
import Payment from './pages/Payment';
import NewUser from './pages/NewUser';

import AuthRequire from './pages/AuthRequire';
import AuthProvider from './context/AuthProvider';
import PageNotFound from './pages/PageNotFound';
import TempPreference from './pages/TempPreference';
import AuthLayout from './pages/AuthLayout';
import UserLayout from './pages/UserLayout';
import WellBeing from './pages/WellBeing';
import Community from './pages/Community';
import Profile from './pages/Profile';
import AddJourneyPage from './pages/admin/AddJourneyPage';
import SpecificJourney from './pages/journey/SpecificJourney';
import JourneyNotFound from './pages/JourneyNotFound';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CurrentJourney from './pages/journey/CurrentJourney';

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
                <Route path={'/newUser'} element={<NewUser />} />
                <Route path={'/preference'} element={<TempPreference />} />
                <Route element={<UserLayout />}>
                  <Route path={'/home'} element={<Home />} />
                  <Route path={'/dashboard'} element={<Dashboard />} />
                  <Route path={'/community'} element={<Community />} />
                  <Route path={'/journey'} element={<Journey />} />
                  <Route
                    path={'/journey/:name'}
                    element={<SpecificJourney />}
                    errorElement={<JourneyNotFound />}
                  />
                  <Route path={'/payment'} element={<Payment />} />
                  <Route path={'/wellbeing'} element={<WellBeing />} />
                  <Route path={'/profile'} element={<Profile />} />
                  <Route
                    path={'/currentJourney/:id'}
                    element={<CurrentJourney />}
                  />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={['admin']} />}>
                <Route path='/addJourney' element={<AddJourneyPage />} />
              </Route>

              <Route path='/journeyNotFound' element={<JourneyNotFound />} />
              <Route path='/unauthorized' element={<UnauthorizedPage />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
