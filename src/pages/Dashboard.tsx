import { useAuthContext } from '../context/AuthProvider';

import useDocumentTitle from '../services/getTitle';

const Dashboard = () => {
  const { user } = useAuthContext();

  useDocumentTitle('Dashboard - SelfSync');
  return <div>Dashboard</div>;
};

export default Dashboard;
