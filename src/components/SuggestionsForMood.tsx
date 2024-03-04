import { useAuthContext } from '../context/AuthProvider';

import { Card } from './ui/card';
import useGetTodayMood from '../services/moods/getTodayMood';

const SuggestionsForMood = () => {
  const { user } = useAuthContext();
  const { data: todayMood } = useGetTodayMood(user?.id as string);

  console.log(todayMood);
  console.log(user);
  console.log(user?.id);

  return (
    <>
      <Card>
        {user?.loggedMood === false && (
          <p>Log your mood for getting suggestions.</p>
        )}
        {user?.loggedMood === true && (
          <>
            <p>
              Suggestions for your mood will be displayed here. You can also
              explore the app to get suggestions.
            </p>
            {/* {loggedMood?.mood} */}
          </>
        )}
      </Card>
    </>
  );
};

export default SuggestionsForMood;
