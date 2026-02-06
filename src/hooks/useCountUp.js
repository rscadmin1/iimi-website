import { useEffect, useState } from 'react';

export function useCountUp(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (!isVisible || hasRun) return;

    setHasRun(true);
    const startTime = performance.now();
    const numericTarget = typeof target === 'string'
      ? parseInt(target.replace(/[^0-9]/g, ''), 10)
      : target;

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericTarget));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(numericTarget);
      }
    }

    requestAnimationFrame(animate);
  }, [isVisible, target, duration, hasRun]);

  return count;
}
