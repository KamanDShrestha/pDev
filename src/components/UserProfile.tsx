import React from 'react';
import { Card } from './ui/card';

const UserProfile = () => {
  return (
    <Card className='flex'>
      <div>
        <img src='https://picsum.photos/200' alt='user' />
      </div>
    </Card>
  );
};

export default UserProfile;
