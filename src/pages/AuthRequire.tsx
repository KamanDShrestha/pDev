import { Outlet, Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';

const AuthRequire = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useAuthContext();

  return allowedRoles.find((role: string) => role === user?.role) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' />
  );
};

export default AuthRequire;
