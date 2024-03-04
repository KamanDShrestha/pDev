import { useAuthContext } from '../context/AuthProvider';
import { Card } from './ui/card';

const SuggestionsForMood = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Card>
        {user?.loggedMood === false && (
          <p>Log your mood for getting suggestions.</p>
        )}
      </Card>
    </>
  );
};

export default SuggestionsForMood;
