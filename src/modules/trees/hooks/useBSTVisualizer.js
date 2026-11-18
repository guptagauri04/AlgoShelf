import { useState, useEffect, useRef, useCallback } from "react";
import {
  getSampleTree,
  flattenBST,
  generateInsertFrames,
  generateSearchFrames,
  generateDeleteFrames,
} from "../utils/bstOperations";

export default function useBSTVisualizer() {
  const [tree, setTree] = useState(() => getSampleTree("balanced"));
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  // Animation & step states
  const [frames, setFrames] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(800); // ms per step
  const [activeOperation, setActiveOperation] = useState(null); // 'insert' | 'search' | 'delete' | null

  const timerRef = useRef(null);

  // Derive current visual elements
  const currentFrame = frames[currentStep] || null;
  const currentNodes = currentFrame ? currentFrame.nodes : flattenBST(tree).nodes;
  const currentEdges = currentFrame ? currentFrame.edges : flattenBST(tree).edges;
  const highlightedNodeId = currentFrame?.highlightedNodeId || null;
  const status = currentFrame?.status || "idle";

  // Playback timer loop
  useEffect(() => {
    if (!isPlaying || frames.length === 0) return;

    if (currentStep < frames.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => {
          const next = prev + 1;
          if (next === frames.length - 1 && frames[next]?.tree) {
            setTree(frames[next].tree);
            setIsPlaying(false);
          }
          return next;
        });
      }, speed);
    } else {
      timerRef.current = setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    }

    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStep, frames, speed]);

  const startOperation = useCallback(
    (opType, valOverride = null) => {
      const valStr = valOverride !== null ? String(valOverride) : inputValue.trim();
      if (!valStr || isNaN(Number(valStr))) {
        setError("Please enter a valid numeric integer value.");
        return;
      }

      const val = parseInt(valStr, 10);
      if (val < 1 || val > 999) {
        setError("Value must be between 1 and 999.");
        return;
      }

      setError(null);
      clearTimeout(timerRef.current);
      setIsPlaying(false);

      let newFrames = [];
      if (opType === "insert") {
        newFrames = generateInsertFrames(tree, val);
      } else if (opType === "search") {
        newFrames = generateSearchFrames(tree, val);
      } else if (opType === "delete") {
        newFrames = generateDeleteFrames(tree, val);
      }

      setFrames(newFrames);
      setCurrentStep(0);
      setActiveOperation({ type: opType, value: val });
      setIsPlaying(true);
      setInputValue("");
    },
    [inputValue, tree]
  );

  const goToNextStep = useCallback(() => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    if (currentStep < frames.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next === frames.length - 1 && frames[next]?.tree) {
        setTree(frames[next].tree);
      }
    }
  }, [currentStep, frames]);

  const goToPrevStep = useCallback(() => {
    setIsPlaying(false);
    clearTimeout(timerRef.current);
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const togglePlayPause = useCallback(() => {
    if (!frames.length) return;
    if (currentStep >= frames.length - 1) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  }, [frames.length, currentStep]);

  const resetTree = useCallback((preset = "balanced") => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setFrames([]);
    setCurrentStep(0);
    setActiveOperation(null);
    setError(null);
    const newTree = getSampleTree(preset);
    setTree(newTree);
  }, []);

  const clearTree = useCallback(() => {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setFrames([]);
    setCurrentStep(0);
    setActiveOperation(null);
    setError(null);
    setTree(null);
  }, []);

  return {
    tree,
    nodes: currentNodes,
    edges: currentEdges,
    highlightedNodeId,
    status,
    inputValue,
    setInputValue,
    error,
    currentStep,
    stepCount: frames.length,
    currentFrame,
    isPlaying,
    speed,
    setSpeed,
    activeOperation,
    startOperation,
    goToNextStep,
    goToPrevStep,
    togglePlayPause,
    resetTree,
    clearTree,
  };
}
