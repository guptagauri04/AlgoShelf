import { useState, useEffect, useRef, useCallback } from "react";
import {
  getInitialList,
  generateInsertHeadSteps,
  generateInsertTailSteps,
  generateInsertAtPositionSteps,
  generateDeleteHeadSteps,
  generateDeleteTailSteps,
  generateDeleteAtPositionSteps,
} from "../utils/linkedListOperations";

export default function useLinkedListVisualizer() {
  const [nodes, setNodes] = useState(getInitialList());
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900); // ms per step

  // Form inputs
  const [inputValue, setInputValue] = useState("50");
  const [indexValue, setIndexValue] = useState("1");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("insert"); // 'insert' | 'delete'

  const timerRef = useRef(null);

  const currentFrame = steps[currentStepIndex] || {
    title: "Ready",
    explanation: "Choose an insertion or deletion operation and click Execute to see step-by-step pointer manipulation.",
    code: "// Singly Linked List Operations\n// O(1) Head updates, O(n) Traversal & Position rewires",
    nodes,
    newNode: null,
    headIndex: nodes.length > 0 ? 0 : null,
    highlightedIndex: null,
    targetIndex: null,
    action: "idle",
    timeComplexity: "—",
    spaceComplexity: "—",
  };

  const handleResetList = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    const initial = getInitialList();
    setNodes(initial);
    setSteps([]);
    setCurrentStepIndex(0);
    setError("");
  }, []);

  const handleClearList = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setNodes([]);
    setSteps([]);
    setCurrentStepIndex(0);
    setError("");
  }, []);

  const startAnimation = (generatedSteps) => {
    if (!generatedSteps || generatedSteps.length === 0) return;
    setError("");
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  // Perform Insert
  const executeInsert = (positionType) => {
    const val = Number(inputValue);
    if (isNaN(val) || inputValue.trim() === "") {
      setError("Please enter a valid numeric value.");
      return;
    }

    let generated = [];
    if (positionType === "head") {
      generated = generateInsertHeadSteps(nodes, val);
    } else if (positionType === "tail") {
      generated = generateInsertTailSteps(nodes, val);
    } else if (positionType === "position") {
      const idx = Number(indexValue);
      if (isNaN(idx) || idx < 0 || idx > nodes.length) {
        setError(`Index must be between 0 and ${nodes.length}.`);
        return;
      }
      generated = generateInsertAtPositionSteps(nodes, val, idx);
    }

    startAnimation(generated);
  };

  // Perform Delete
  const executeDelete = (positionType) => {
    if (nodes.length === 0) {
      setError("Cannot delete: Linked list is empty.");
      return;
    }

    let generated = [];
    if (positionType === "head") {
      generated = generateDeleteHeadSteps(nodes);
    } else if (positionType === "tail") {
      generated = generateDeleteTailSteps(nodes);
    } else if (positionType === "position") {
      const idx = Number(indexValue);
      if (isNaN(idx) || idx < 0 || idx >= nodes.length) {
        setError(`Index must be between 0 and ${nodes.length - 1}.`);
        return;
      }
      generated = generateDeleteAtPositionSteps(nodes, idx);
    }

    startAnimation(generated);
  };

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            // Save final state of nodes
            if (steps[steps.length - 1]?.nodes) {
              setNodes(steps[steps.length - 1].nodes);
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

  // Stepping controls
  const stepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      if (nextIdx === steps.length - 1 && steps[nextIdx]?.nodes) {
        setNodes(steps[nextIdx].nodes);
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
    nodes,
    steps,
    currentStepIndex,
    currentFrame,
    isPlaying,
    speed,
    setSpeed,
    inputValue,
    setInputValue,
    indexValue,
    setIndexValue,
    error,
    setError,
    activeTab,
    setActiveTab,
    executeInsert,
    executeDelete,
    stepForward,
    stepBackward,
    togglePlay,
    handleResetList,
    handleClearList,
  };
}
