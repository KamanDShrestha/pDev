import { useEffect, useState } from 'react';

const CountdownTimer = ({ minutes }: { minutes: number }) => {
  const [totalSeconds, setTotalSeconds] = useState(minutes * 60);

  useEffect(() => {
    let thisInterval = setInterval(() => {
      let providedValue = totalSeconds;
      if (providedValue > 0) {
        setTotalSeconds((value) => {
          if (value > 0) {
            return value - 1;
          } else {
            clearInterval(thisInterval);
            return 0;
          }
        });
        providedValue--;
      }
    }, 1000);

    return () => clearInterval(thisInterval);
  }, []);

  return (
    <div className='text-sm'>
      <span>
        {Math.floor(totalSeconds / 60)
          .toString()
          .padStart(2, '0')}
      </span>
      :<span>{(totalSeconds % 60).toString().padStart(2, '0')}</span>
    </div>
  );
};

export default CountdownTimer;
