import React, { useState, useEffect } from 'react';

const Time = () => {
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    function getCurrentTime() {
      const currentDate = new Date();
      let hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const isPM = hours >= 12;
      hours = hours % 12 || 12;
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${isPM ? 'pm' : 'am'}`;
      return formattedTime;
    }
    setCurrentTime(getCurrentTime());
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 10000);
    return () => clearInterval(interval);
  }, []);
  return <div className='current_time'>{currentTime}</div>;
}
export default Time;