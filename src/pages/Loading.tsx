import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';
const Loading = () => {
  const { user, isLoading } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      navigate('/home'); // replace with your actual home route
    }
  }, [isLoading, navigate, user]);

  console.log('in loading page');

  return (
    <div className='w-[100vh] h-[100vh] flex justify-center items-center'>
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
