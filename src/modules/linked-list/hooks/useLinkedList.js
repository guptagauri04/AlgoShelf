
import { useState, useRef } from "react";
import SinglyLinkedList from "../utils/linkedList";

const useLinkedList = () => {
  // Store the actual linked list instance
  const listRef = useRef(new SinglyLinkedList());

  // Store nodes in React state so the UI updates automatically
  const [nodes, setNodes] = useState([]);

  // Traversal-related states
  const [traversalSteps, setTraversalSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [status, setStatus] = useState("idle");

  // Add a new node to the linked list
  const addNode = (value) => {
    if (value === undefined || value === null || String(value).trim() === "") {
      return false;
    }

    // Add node to the actual linked list
    listRef.current.append(value);

    // Update React state
    setNodes(listRef.current.getNodes());

    // Reset traversal because the list has changed
    setTraversalSteps([]);
    setCurrentStep(-1);
    setStatus("idle");

    return true;
  };

  // Start traversal from the head node
  const startTraversal = () => {
    const steps = listRef.current.traverse();

    setTraversalSteps(steps);
    setCurrentStep(0);

    if (steps.length === 0 || steps[0].type === "complete") {
      setStatus("completed");
    } else {
      setStatus("running");
    }
  };

  // Move to the next traversal step
  const nextStep = () => {
    if (status !== "running") return;

    const nextIndex = currentStep + 1;

    if (nextIndex >= traversalSteps.length) {
      setStatus("completed");
      return;
    }

    setCurrentStep(nextIndex);

    if (traversalSteps[nextIndex].type === "complete") {
      setStatus("completed");
    }
  };

  // Reset the entire linked list
  const resetList = () => {
    listRef.current.clear();

    setNodes([]);
    setTraversalSteps([]);
    setCurrentStep(-1);
    setStatus("idle");
  };

  // Get the currently visited node
  const currentTraversalStep = traversalSteps[currentStep];

  const currentNodeIndex =
    currentTraversalStep?.type === "visit"
      ? currentTraversalStep.index
      : null;

  const currentNode =
    currentNodeIndex !== null
      ? nodes.find((node) => node.id === currentNodeIndex) || null
      : null;

  return {
    nodes,
    traversalSteps,
    currentStep,
    currentNode,
    currentNodeIndex,
    status,

    addNode,
    startTraversal,
    nextStep,
    resetList,
  };
};

export default useLinkedList;
