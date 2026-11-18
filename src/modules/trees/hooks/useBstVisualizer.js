import { useState, useEffect, useRef, useCallback } from "react";
import {
  getInitialTree,
  cloneTree,
  calculateTreeLayout,
  generateSearchSteps,
  generateInsertSteps,
  generateDeleteSteps,
} from "../utils/bstOperations";

export default function useBstVisualizer() {
  const [treeRoot, setTreeRoot] = useState(getInitialTree());
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const [inputValue, setInputValue] = useState("45");
  const [error, setError] = useState("");
  const [activeAction, setActiveAction] = useState("insert"); // 'insert' | 'search' | 'delete'

  const timerRef = useRef(null);

  const currentFrame = steps[currentStepIndex] || {
    title: "Binary Search Tree Ready",
    explanation: "Insert, Search, or Delete a node to watch the BST traversal and comparison path in real time.",
    code: "// In a BST: Left child < Node < Right child\n// Search / Insert / Delete run in O(log n) average time",
    treeSnapshot: treeRoot,
    highlightedId: null,
    foundId: null,
    comparison: null,
    timeComplexity: "O(log n)",
  };

  const layout = calculateTreeLayout(currentFrame.treeSnapshot);

  const startAnimation = (generatedSteps) => {
    if (!generatedSteps || generatedSteps.length === 0) return;
    setError("");
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handleExecute = () => {
    const val = Number(inputValue);
    if (isNaN(val) || inputValue.trim() === "") {
      setError("Please enter a valid numeric value.");
      return;
    }

    let generated = [];
    if (activeAction === "insert") {
      generated = generateInsertSteps(treeRoot, val);
    } else if (activeAction === "search") {
      generated = generateSearchSteps(treeRoot, val);
    } else if (activeAction === "delete") {
      generated = generateDeleteSteps(treeRoot, val);
    }

    startAnimation(generated);
  };

  const handleResetSample = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const initial = getInitialTree();
    setTreeRoot(initial);
    setSteps([]);
    setCurrentStepIndex(0);
    setError("");
  }, []);

  const handleClear = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setTreeRoot(null);
    setSteps([]);
    setCurrentStepIndex(0);
    setError("");
  }, []);

  // Playback timer
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            if (steps[steps.length - 1]?.treeSnapshot !== undefined) {
              setTreeRoot(cloneTree(steps[steps.length - 1].treeSnapshot));
            }
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps, speed]);

  const stepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === steps.length - 1 && steps[nextIdx]?.treeSnapshot !== undefined) {
        setTreeRoot(cloneTree(steps[nextIdx].treeSnapshot));
      }
    }
  };

  const stepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const togglePlay = () => {
    if (steps.length === 0) return;
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  return {
    treeRoot,
    steps,
    currentStepIndex,
    currentFrame,
    layout,
    isPlaying,
    speed,
    setSpeed,
    inputValue,
    setInputValue,
    error,
    activeAction,
    setActiveAction,
    handleExecute,
    stepForward,
    stepBackward,
    togglePlay,
    handleResetSample,
    handleClear,
  };
}
