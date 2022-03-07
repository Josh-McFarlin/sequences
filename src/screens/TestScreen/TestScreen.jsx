import React from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { sequences } from "../../utils/sequence";
import YoutubePlayer from "../../components/YoutubePlayer";
import urls from "../../utils/urls";
import classes from "./TestScreen.module.scss";

const testTime = 2 * 60 * 1000; // 2 minutes

const TestScreen = () => {
  const router = useRouter();
  // 0 = waiting, 1 = memorization, 2 = recall
  const [stage, setStage] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [playMemorization, setPlayMemorization] = React.useState(false);
  const [playRecall, setPlayRecall] = React.useState(false);
  const timer = React.useRef(0);

  React.useEffect(() => {
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  React.useEffect(() => {
    const params = router.query || {};

    const memEnabled = params.mem === "true" || Math.random() < 0.5;
    const recallEnabled = params.recall === "true" || Math.random() < 0.5;

    setPlayMemorization(memEnabled);
    setPlayRecall(recallEnabled);
  }, [router]);

  const handleSubmit = async () => {
    await router.replace(urls.debrief);
  };

  const handleStart = () => {
    if (playMemorization) {
      setPlaying(true);
    }

    setStage(1);

    timer.current = setTimeout(() => {
      if (!playRecall) {
        setPlaying(false);
      } else if (!playMemorization) {
        setPlaying(true);
      }

      setStage(2);

      timer.current = setTimeout(handleSubmit, testTime);
    }, testTime);
  };

  return (
    <div className={clsx(classes.root)}>
      {stage === 0 && (
        <>
        <label>
          Participant ID:
          <input inputMode="numeric" />
          </label>
          <button onClick={handleStart}>Press When Ready</button>
        </>
      )}
      {stage === 1 && (
        <>
          {sequences.map((sequence) => (
            <h3 key={sequence}>{sequence}</h3>
          ))}
        </>
      )}
      {stage === 2 && (
        <>
          <h2>Recall</h2>
          <h3>
            Type the numbers you memorized in order, and press submit when the
            timer is up. You will have 2 minutes, the timer starts now.
          </h3>
          {sequences.map((sequence) => (
            <input key={sequence} inputMode="numeric" />
          ))}
          <div className={classes.row}>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </>
      )}
      <YoutubePlayer
        url={"https://youtu.be/1prweT95Mo0?t=8"}
        playing={playing}
      />
    </div>
  );
};

export default TestScreen;
