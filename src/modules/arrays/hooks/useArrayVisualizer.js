import { useEffect, useRef, useState } from "react";
import {
  createDeletionSteps,
  createInsertionSteps,
  generateSampleArray,
  parseArrayInput,
  parseIndexInput,
} from "../utils/arrayOperations";

const EMPTY_STEPS = [];

function createItems(values, nextId) {
  return values.map((value) => ({ id: nextId(), value }));
}

export default function useArrayVisualizer() {
  const nextIdRef = useRef(0);
  const nextId = () => `array-item-${nextIdRef.current++}`;
  const [items, setItems] = useState(() =>
    generateSampleArray().map((value, index) => ({
      id: `initial-array-item-${index}`,
      value,
    })),
  );
  const [arrayInput, setArrayInput] = useState(() =>
    items.map((item) => item.value).join(", "),
  );
  const [arrayError, setArrayError] = useState("");
  const [operationError, setOperationError] = useState("");
  const [operation, setOperation] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [indexInput, setIndexInput] = useState("");
  const [valueInput, setValueInput] = useState("");

  const steps = operation ? operation.steps : EMPTY_STEPS;
  const currentFrame = steps[currentStep];
  const visibleItems = currentFrame?.items ?? items;
  const isLocked = operation !== null;

  useEffect(() => {
    if (!playing || !currentFrame || currentFrame.isFinal) return undefined;

    const timer = window.setTimeout(() => {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      if (steps[nextStep]?.isFinal) {
        setPlaying(false);
      }
    }, 850);

    return () => window.clearTimeout(timer);
  }, [playing, currentFrame, currentStep, steps]);

  function applyArrayInput() {
    const result = parseArrayInput(arrayInput);

    if (result.error) {
      setArrayError(result.error);
      return;
    }

    setItems(createItems(result.values, nextId));
    setArrayError("");
    setOperationError("");
  }

  function loadSampleArray() {
    const sample = generateSampleArray();
    setItems(createItems(sample, nextId));
    setArrayInput(sample.join(", "));
    setArrayError("");
    setOperationError("");
  }

  function startOperation(type) {
    setOperationError("");

    if (isLocked) {
      setOperationError("Reset the current operation before starting another.");
      return;
    }

    if (type === "delete" && items.length === 0) {
      setOperationError("Cannot delete from an empty array.");
      return;
    }

    const parsedIndex = parseIndexInput(
      indexInput,
      type === "insert" ? items.length : items.length - 1,
      type,
    );

    if (parsedIndex.error) {
      setOperationError(parsedIndex.error);
      return;
    }

    let nextSteps;

    if (type === "insert") {
      if (!valueInput.trim() || !Number.isFinite(Number(valueInput))) {
        setOperationError("Enter a valid numeric value to insert.");
        return;
      }

      const value = Number(valueInput);
      nextSteps = createInsertionSteps(items, value, parsedIndex.index, nextId());
    } else {
      nextSteps = createDeletionSteps(items, parsedIndex.index);
    }

    setOperation({ type, steps: nextSteps });
    setCurrentStep(0);
    setPlaying(false);
  }

  function resetOperation() {
    setPlaying(false);
    setOperation(null);
    setCurrentStep(0);
    setOperationError("");
  }

  function goToPreviousStep() {
    setPlaying(false);
    setCurrentStep((step) => Math.max(0, step - 1));
  }

  function goToNextStep() {
    setPlaying(false);
    setCurrentStep((step) => Math.min(steps.length - 1, step + 1));
  }

  function togglePlayback() {
    if (!currentFrame || currentFrame.isFinal) return;
    setPlaying((isPlaying) => !isPlaying);
  }

  return {
    arrayInput,
    setArrayInput,
    arrayError,
    applyArrayInput,
    loadSampleArray,
    items: visibleItems,
    currentFrame,
    currentStep,
    steps,
    operation,
    operationError,
    setOperationError,
    indexInput,
    setIndexInput,
    valueInput,
    setValueInput,
    startOperation,
    resetOperation,
    goToPreviousStep,
    goToNextStep,
    togglePlayback,
    playing,
    isLocked,
  };
}
