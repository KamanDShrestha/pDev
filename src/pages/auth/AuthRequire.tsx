import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';
// import Cookies from 'js-cookie';
// import { useEffect } from 'react';

const AuthRequire = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuthContext();

  const location = useLocation();

  // useEffect(() => {
  //   if (!token) {
  //     setUser && setUser({} as AuthContextType);
  //     localStorage.removeItem('authentication');
  //     <Navigate to='/login' replace />;
  //   }
  // }, []);

  console.log(user);
  return allowedRoles.find((role: string) => role === user?.role) ? (
    user?.email && user.isNewUser ? (
      <Navigate to={'/newUser'} state={{ from: location }} replace />
    ) : (
      <Outlet />
    )
  ) : user?.email ? (
    <Navigate to={'/unauthorized'} state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace /> //with this the page is redirected to Login page and the location of the previous page is remembered in state in 'from' property with which from the login page, the previous page can be directed
  );
};

export default AuthRequire;
