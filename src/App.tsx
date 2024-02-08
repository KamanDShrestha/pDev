import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './pages/GettingStarted';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import { ThemeProvider } from './components/ThemeProvider';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Journey from './pages/journey/Journey';
import Payment from './pages/Payment';
import NewUser from './pages/NewUser';

import AuthRequire from './pages/auth/AuthRequire';
import AuthProvider from './context/AuthProvider';
import PageNotFound from './pages/PageNotFound';
import TempPreference from './pages/TempPreference';
import AuthLayout from './pages/layouts/AuthLayout';
import UserLayout from './pages/layouts/UserLayout';
import WellBeing from './pages/WellBeing';
import Community from './pages/Community';
import Profile from './pages/Profile';
import AddJourneyPage from './pages/admin/AddJourneyPage';
import SpecificJourney from './pages/journey/SpecificJourney';
import JourneyNotFound from './pages/JourneyNotFound';
import UnauthorizedPage from './pages/UnauthorizedPage';
import CurrentJourney from './pages/journey/CurrentJourney';
import UsersAction from './pages/admin/UsersAction';
import VerifyJourneyPage from './pages/qha/VerifyJourneyPage';
import NotSubscribed from './pages/NotSubscribed';
import AdminDashboard from './pages/admin/AdminDashboard';
import EditJourneyPage from './pages/admin/EditJourneyPage';

import ApplyForQHP from './pages/ApplyForQHP';

import Review from './pages/admin/Review';
import Feedbacks from './pages/admin/Feedbacks';
import AddCommunity from './pages/admin/AddCommunity';
import SpecificCommunity from './pages/SpecificCommunity';
import QAs from './pages/qha/QAs';
import WellbeingForAdmin from './pages/admin/WellbeingForAdmin';
import Loading from './pages/Loading';
import Subscribe from './pages/Subscribe';
import SubscribeForAdmin from './pages/SubscribeForAdmin';
import SubscriptionConfirmation from './pages/SubscriptionConfirmation';
import VerifyKhaltiSubscription from './pages/VerifyKhaltiSubscription';
import VerifyQuestionPromptsPage from './pages/qha/VerifyQuestionPromptsPage';
import FeedbacksForPrompts from './pages/admin/FeedbacksForPrompts';
import EditQuestionPromptPage from './pages/admin/EditQuestionPromptPage';
import SpecificUserPosts from './pages/SpecificUserPosts';
import EditSubscriptionPlanPage from './pages/admin/EditSubscriptionPlanPage';

function App() {
  return (
    <>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={'/loading'} element={<Loading />} />
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
                <Route path={'/preference'} element={<TempPreference />} />
                <Route element={<UserLayout />}>
                  <Route path={'/home'} element={<Home />} />
                  <Route path={'/dashboard'} element={<Dashboard />} />
                  <Route path={'/community'} element={<Community />} />
                  <Route
                    path={'/community/:communityId'}
                    element={<SpecificCommunity />}
                  />
                  <Route
                    path={'/community/:communityId/posts/:userId'}
                    element={<SpecificUserPosts />}
                  />

                  <Route path={'/journeys'} element={<Journey />} />
                  <Route
                    path={'/journeys/:name'}
                    element={<SpecificJourney />}
                    errorElement={<JourneyNotFound />}
                  />
                  <Route
                    path={'/currentJourney/:id'}
                    element={<CurrentJourney />}
                  />
                  <Route path={'/payment'} element={<Payment />} />
                  <Route path={'/wellbeing'} element={<WellBeing />} />
                  <Route path={'/profile'} element={<Profile />} />
                  <Route path='/subscribe' element={<Subscribe />} />

                  <Route
                    path='/subscribe/:subscriptionId'
                    element={<SubscriptionConfirmation />}
                  />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={['user']} />}>
                <Route element={<UserLayout />}>
                  <Route path={'/apply'} element={<ApplyForQHP />} />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={['admin']} />}>
                <Route element={<UserLayout />}>
                  <Route path='/addJourney' element={<AddJourneyPage />} />
                  <Route path='/addCommunity' element={<AddCommunity />} />
                  <Route path='/users' element={<UsersAction />} />
                  <Route path='/admin/dashboard' element={<AdminDashboard />} />

                  <Route path='/reviewApplications' element={<Review />} />

                  <Route
                    path='/journeys/edit/:id'
                    element={<EditJourneyPage />}
                  />
                  <Route
                    path='/prompts/edit/:id'
                    element={<EditQuestionPromptPage />}
                  />
                  <Route
                    path='/subscriptionPlans/edit/:id'
                    element={<EditSubscriptionPlanPage />}
                  />
                  <Route path='/feedbacks' element={<Feedbacks />} />
                  <Route
                    path='/feedbacksForPrompts'
                    element={<FeedbacksForPrompts />}
                  />

                  <Route
                    path='/wellbeingForAdmin'
                    element={<WellbeingForAdmin />}
                  />
                  <Route
                    path='/subscribeForAdmin'
                    element={<SubscribeForAdmin />}
                  />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={['qha']} />}>
                <Route element={<UserLayout />}>
                  <Route
                    path='/verifyJourneys'
                    element={<VerifyJourneyPage />}
                  />
                  <Route
                    path='/verifyQuestionPrompts'
                    element={<VerifyQuestionPromptsPage />}
                  />
                  <Route path='/qas' element={<QAs />} />
                </Route>
              </Route>
              <Route
                path='/verifyKhalti'
                element={<VerifyKhaltiSubscription />}
              />
              <Route path={'/newUser'} element={<NewUser />} />
              <Route path='/journeyNotFound' element={<JourneyNotFound />} />
              <Route path='/unauthorized' element={<UnauthorizedPage />} />
              <Route path='/notSubscribed' element={<NotSubscribed />} />

              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
