import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GettingStarted from './pages/GettingStarted';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<GettingStarted />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/register'} element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
