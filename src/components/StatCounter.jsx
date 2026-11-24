import React, { useState, useEffect } from 'react';

export default function StatCounter({ end, duration = 1200, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const finalValue = parseInt(end, 10) || 0;
    if (finalValue === 0) {
      setCount(0);
      return;
    }
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = finalValue / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= finalValue) {
        setCount(finalValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
