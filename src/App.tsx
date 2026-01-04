import { BrowserRouter, Routes, Route } from "react-router-dom"
import GettingStarted from "./pages/GettingStarted"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"

import { ThemeProvider } from "./components/ThemeProvider"
import Home from "./pages/Home"
import Dashboard from "./pages/dashboards/Dashboard"
import Journey from "./pages/journey/Journey"
import NewUser from "./pages/NewUser"

import AuthRequire from "./pages/auth/AuthRequire"
import AuthProvider from "./context/AuthProvider"
import PageNotFound from "./pages/PageNotFound"
import TempPreference from "./pages/TempPreference"
import AuthLayout from "./pages/layouts/AuthLayout"
import UserLayout from "./pages/layouts/UserLayout"
import WellBeing from "./pages/WellBeing"

import Profile from "./pages/Profile"
import AddJourneyPage from "./pages/admin/AddJourneyPage"
import SpecificJourney from "./pages/journey/SpecificJourney"

import UnauthorizedPage from "./pages/UnauthorizedPage"
import CurrentJourney from "./pages/journey/CurrentJourney"
import UsersAction from "./pages/admin/UsersAction"
import VerifyJourneyPage from "./pages/qhp/VerifyJourneyPage"
import AdminDashboard from "./pages/admin/AdminDashboard"
import EditJourneyPage from "./pages/admin/EditJourneyPage"

import ApplyForQHP from "./pages/ApplyForQHP"

import Review from "./pages/admin/Review"
import Feedbacks from "./pages/admin/Feedbacks"
import AddCommunity from "./pages/admin/AddCommunity"

import QAs from "./pages/qhp/QAs"
import WellbeingForAdmin from "./pages/admin/WellbeingForAdmin"
import Loading from "./pages/Loading"

import VerifyQuestionPromptsPage from "./pages/qhp/VerifyQuestionPromptsPage"
import FeedbacksForPrompts from "./pages/admin/FeedbacksForPrompts"
import EditQuestionPromptPage from "./pages/admin/EditQuestionPromptPage"
import SpecificUserPosts from "./pages/SpecificUserPosts"
import EditSubscriptionPlanPage from "./pages/admin/EditSubscriptionPlanPage"
import ConfigureLearningResources from "./pages/admin/ConfigureLearningResources"
import AddQuotes from "./pages/admin/AddQuotes"
import ConfigureLearningPodcasts from "./pages/admin/ConfigureLearningPodcasts"
import Learn from "./pages/Learn"
import GoalSetting from "./pages/GoalSetting"

import CompletedJourney from "./pages/journey/CompletedJourney"

import TokenVerification from "./pages/auth/TokenVerification"
import ReverifyEmail from "./pages/auth/ReverifyEmail"
import ForgetPassword from "./pages/auth/ForgetPassword"
import ChatConversation from "./pages/chat/ChatConversation"
import Pings from "./pages/Pings"
import Community from "./pages/community/Community"
import ActionStepsExamples from "./pages/community/ActionStepsExamples"
import SpecificCommunity from "./pages/community/SpecificCommunity"
import NotSubscribed from "./pages/subscriptions/NotSubscribed"
import PaymentDetails from "./pages/subscriptions/PaymentDetails"
import Subscribe from "./pages/subscriptions/Subscribe"
import SubscriptionConfirmation from "./pages/subscriptions/SubscriptionConfirmation"
import VerifyKhaltiSubscription from "./pages/subscriptions/VerifyKhaltiSubscription"
import JourneyNotFound from "./pages/UnauthorizedPage"
import SubscribeForAdmin from "./pages/admin/SubscribeForAdmin"
import AuthCallback from "./pages/auth/AuthCallback"
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path={"/loading"} element={<Loading />} />
              <Route element={<AuthRequire allowedRoles={["user", "admin", "qhp"]} />}>
                <Route element={<AuthLayout />}>
                  <Route index element={<GettingStarted />} />
                  <Route path={"/login"} element={<Login />} />
                  <Route path={"/register"} element={<Register />} />
                  <Route path={"/verify"} element={<TokenVerification />} />
                  <Route path={"/reverify"} element={<ReverifyEmail />} />
                  <Route path="/forgetPassword" element={<ForgetPassword />} />
                  <Route path={"/auth/callback"} element={<AuthCallback />} />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={["user", "admin", "qhp"]} />}>
                <Route path={"/preference"} element={<TempPreference />} />
                <Route element={<UserLayout />}>
                  <Route path={"/home"} element={<Home />} />
                  <Route path={"/dashboard"} element={<Dashboard />} />
                  <Route path={"/community"} element={<Community />} />
                  <Route path={"/community/:communityId"} element={<SpecificCommunity />} />
                  <Route path={"/community/:communityId/posts/:userId"} element={<SpecificUserPosts />} />

                  <Route path={"/journeys"} element={<Journey />} />
                  <Route path={"/journeys/:id/:name"} element={<SpecificJourney />} errorElement={<JourneyNotFound />} />
                  <Route path={"/journeys/:id/actionSteps/examples"} element={<ActionStepsExamples />} errorElement={<JourneyNotFound />} />
                  <Route path={"/currentJourney/:id"} element={<CurrentJourney />} />
                  <Route path={"/completedJourney/:id"} element={<CompletedJourney />} />
                  <Route path={"/wellbeing"} element={<WellBeing />} />
                  <Route path={"/profile"} element={<Profile />} />
                  <Route path="/subscribe" element={<Subscribe />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/subscribe/:subscriptionId" element={<SubscriptionConfirmation />} />

                  <Route path="/goalSetting" element={<GoalSetting />} />
                  <Route path="/paymentDetails" element={<PaymentDetails />} />
                  <Route path="/chat" element={<ChatConversation />} />
                  <Route path="/ping" element={<Pings />} />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={["user"]} />}>
                <Route element={<UserLayout />}>
                  <Route path={"/apply"} element={<ApplyForQHP />} />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={["admin"]} />}>
                <Route element={<UserLayout />}>
                  <Route path="/addJourney" element={<AddJourneyPage />} />
                  <Route path="/addCommunity" element={<AddCommunity />} />
                  <Route path="/users" element={<UsersAction />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />

                  <Route path="/reviewApplications" element={<Review />} />

                  <Route path="/journeys/edit/:id" element={<EditJourneyPage />} />
                  <Route path="/prompts/edit/:id" element={<EditQuestionPromptPage />} />
                  <Route path="/subscriptionPlans/edit/:id" element={<EditSubscriptionPlanPage />} />
                  <Route path="/feedbacks" element={<Feedbacks />} />
                  <Route path="/feedbacksForPrompts" element={<FeedbacksForPrompts />} />

                  <Route path="/wellbeingForAdmin" element={<WellbeingForAdmin />} />
                  <Route path="/subscribeForAdmin" element={<SubscribeForAdmin />} />

                  <Route path="/configureQuotes" element={<AddQuotes />} />

                  <Route path="/configureResources" element={<ConfigureLearningResources />} />
                  <Route path="/configureResources/podcasts" element={<ConfigureLearningPodcasts />} />
                </Route>
              </Route>

              <Route element={<AuthRequire allowedRoles={["qhp"]} />}>
                <Route element={<UserLayout />}>
                  <Route path="/verifyJourneys" element={<VerifyJourneyPage />} />
                  <Route path="/verifyQuestionPrompts" element={<VerifyQuestionPromptsPage />} />
                  <Route path="/qas" element={<QAs />} />
                </Route>
              </Route>
              <Route path="/verifyKhalti" element={<VerifyKhaltiSubscription />} />
              <Route path={"/newUser"} element={<NewUser />} />
              <Route path="/journeyNotFound" element={<JourneyNotFound />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />
              <Route path="/notSubscribed" element={<NotSubscribed />} />

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

export default App
