import { useEffect, useState } from 'react';

const NoConnection = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setIsConnected(() => false);
      setShowText(() => true);

      setTimeout(() => {
        setShowText(() => false);
      }, 3000);
    });

    window.addEventListener('online', () => {
      setIsConnected(() => true);
      setShowText(() => true);

      setTimeout(() => {
        setShowText(() => false);
      }, 3000);
    });

    return () => {
      window.removeEventListener('offline', () => {
        setIsConnected(() => false);
        setShowText(() => true);

        setTimeout(() => {
          setShowText(() => false);
        }, 3000);
      });

      window.removeEventListener('online', () => {
        setIsConnected(() => true);
        setShowText(() => true);

        setTimeout(() => {
          setShowText(() => false);
        }, 3000);
      });
    };
  }, []);

  return (
    <>
      {showText && (
        <div
          className={`absolute bottom-0 text-sm w-full text-center p-3 ${
            isConnected ? 'bg-green-300' : ' bg-red-300'
          }`}
        >
          {isConnected
            ? 'You are back online.'
            : 'You are offline. Please come back online to use the application.'}
        </div>
      )}
    </>
  );
};

export default NoConnection;
