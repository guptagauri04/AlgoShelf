import { useState, useEffect, useRef, useMemo } from "react";
import { TREE_PRESETS, computeTreeLayout } from "../utils/treeData";
import {
  generateTraversalSteps,
  getTraversalValues,
} from "../utils/traversalEngine";

export default function useTreeTraversal(defaultPreset = "balanced", defaultType = "inorder") {
  const [presetKey, setPresetKey] = useState(defaultPreset);
  const [traversalType, setTraversalType] = useState(defaultType);
  const [speed, setSpeed] = useState(700);
  const [playing, setPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const activePreset = TREE_PRESETS[presetKey] || TREE_PRESETS.balanced;
  const currentRoot = activePreset.root;

  // Compute SVG layout
  const layout = useMemo(() => {
    return computeTreeLayout(currentRoot, 740, 360);
  }, [currentRoot]);

  // Generate steps for the current tree and traversal type
  const steps = useMemo(() => {
    return generateTraversalSteps(currentRoot, traversalType);
  }, [currentRoot, traversalType]);

  // Precomputed full sequences for all 3 traversals for side-by-side comparison
  const comparisonSequences = useMemo(() => {
    return {
      inorder: getTraversalValues(currentRoot, "inorder"),
      preorder: getTraversalValues(currentRoot, "preorder"),
      postorder: getTraversalValues(currentRoot, "postorder"),
    };
  }, [currentRoot]);

  const totalSteps = steps.length;
  const currentFrame = steps[currentStepIndex] || steps[0] || null;
  const isFinished = totalSteps > 0 && currentStepIndex >= totalSteps - 1;

  const timerRef = useRef(null);

  // Playback timer
  useEffect(() => {
    if (!playing || totalSteps === 0 || isFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= totalSteps - 1) {
          setPlaying(false);
        }
        return Math.min(next, totalSteps - 1);
      });
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, totalSteps, isFinished, speed]);

  const play = () => {
    if (isFinished) {
      setCurrentStepIndex(0);
    }
    setPlaying(true);
  };

  const pause = () => {
    setPlaying(false);
  };

  const togglePlayPause = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  const nextStep = () => {
    pause();
    setCurrentStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
  };

  const prevStep = () => {
    pause();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const reset = () => {
    pause();
    setCurrentStepIndex(0);
  };

  const changeTraversalType = (newType) => {
    pause();
    setTraversalType(newType);
    setCurrentStepIndex(0);
  };

  const changePreset = (newPresetKey) => {
    pause();
    setPresetKey(newPresetKey);
    setCurrentStepIndex(0);
  };

  return {
    presetKey,
    activePreset,
    changePreset,
    traversalType,
    changeTraversalType,
    speed,
    setSpeed,
    playing,
    play,
    pause,
    togglePlayPause,
    nextStep,
    prevStep,
    reset,
    currentStepIndex,
    totalSteps,
    isFinished,
    currentFrame,
    layout,
    comparisonSequences,
  };
}
