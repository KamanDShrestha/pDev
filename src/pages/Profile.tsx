import { useAuthContext } from '../context/AuthProvider';
import Heading from '../components/Heading';

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <>
      <div className='flex flex-wrap items-center justify-between gap-5'>
        <div>
          <span style={{ fontSize: '200px' }}>👦🏻</span>
        </div>
        <div>
          <Heading>Personal Details</Heading>
          <div>
            <div>
              <span>Name: </span>
              <span>{user?.firstName}</span>
            </div>
            <div>
              <span>Email: </span>
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
