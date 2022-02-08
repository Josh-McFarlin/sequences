import React from "react";

export const useIntervalIndex = (start, end, step, interval) => {
  const timer = React.useRef(0);
  const [index, setIndex] = React.useState(-1);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  React.useEffect(() => {
    if ((start < end && index > end) || (start > end && index < end)) {
      clearInterval(timer.current);
      setRunning(false);
    }
  }, [index]);

  const handleStart = React.useCallback(() => {
    setRunning(true);
    setIndex(start);

    timer.current = setInterval(
      () => setIndex((prevIndex) => prevIndex + step),
      interval
    );
  }, [step, interval]);

  const handleRestart = React.useCallback(() => {
    clearInterval(timer.current);
    setIndex(start);
    setRunning(false);
  }, []);

  return {
    index,
    running,
    handleStart,
    handleRestart,
  };
};
