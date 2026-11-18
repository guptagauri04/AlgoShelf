import { useEffect, useRef, useState } from "react";

export default function useDijkstraAnimation(steps = [], defaultSpeed = 800) {
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(defaultSpeed);
  const timerRef = useRef(null);

  const totalSteps = steps.length;
  const currentFrame = steps[currentStep] || null;
  const isFinished = totalSteps > 0 && currentStep >= totalSteps - 1;

  useEffect(() => {
    if (!playing || totalSteps === 0 || isFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= totalSteps - 1) setPlaying(false);
        return Math.min(next, totalSteps - 1);
      });
    }, speed);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, totalSteps, isFinished, speed]);

  const play = () => {
    if (isFinished) setCurrentStep(0);
    setPlaying(true);
  };
  const pause = () => setPlaying(false);
  const togglePlayPause = () => (playing ? pause() : play());
  const nextStep = () => { setPlaying(false); setCurrentStep((p) => Math.min(p + 1, totalSteps - 1)); };
  const prevStep = () => { setPlaying(false); setCurrentStep((p) => Math.max(p - 1, 0)); };
  const reset = () => { setPlaying(false); setCurrentStep(0); };

  return {
    currentStep, setCurrentStep, currentFrame,
    playing, speed, setSpeed,
    totalSteps, isFinished,
    play, pause, togglePlayPause, nextStep, prevStep, reset,
  };
}
