import { useState, useEffect, useRef, useCallback } from "react";
import {
  defaultGraphNodes,
  defaultGraphEdges,
  buildAdjacencyList,
  buildAdjacencyMatrix,
  generateBfsSteps,
  generateDfsSteps,
} from "../utils/graphOperations";

export default function useGraphVisualizer() {
  const [nodes] = useState(defaultGraphNodes);
  const [edges] = useState(defaultGraphEdges);
  const [algorithm, setAlgorithm] = useState("bfs"); // 'bfs' | 'dfs'
  const [startNodeId, setStartNodeId] = useState(0);
  const [repTab, setRepTab] = useState("list"); // 'list' | 'matrix'

  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const timerRef = useRef(null);

  const adjList = buildAdjacencyList(nodes, edges);
  const adjMatrix = buildAdjacencyMatrix(nodes, edges);

  const currentFrame = steps[currentStepIndex] || {
    title: "Graph Traversal Ready",
    explanation: "Select Breadth-First Search (BFS) or Depth-First Search (DFS) and click Start Traversal to begin.",
    code: "// BFS uses Queue (FIFO) ➔ Layer by layer\n// DFS uses Stack (LIFO) ➔ Branch by branch",
    currentNode: null,
    activeNeighbor: null,
    visited: [],
    queueOrStack: [],
    dataStructureType: algorithm === "bfs" ? "Queue (FIFO)" : "Call Stack (LIFO)",
    activeEdge: null,
    traversalOrder: [],
  };

  const handleStart = () => {
    const generated =
      algorithm === "bfs"
        ? generateBfsSteps(nodes, edges, Number(startNodeId))
        : generateDfsSteps(nodes, edges, Number(startNodeId));
    setSteps(generated);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  };

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSteps([]);
    setCurrentStepIndex(0);
  }, []);

  // Timer loop
  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
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
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const stepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const togglePlay = () => {
    if (steps.length === 0) {
      handleStart();
      return;
    }
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  return {
    nodes,
    edges,
    adjList,
    adjMatrix,
    algorithm,
    setAlgorithm,
    startNodeId,
    setStartNodeId,
    repTab,
    setRepTab,
    steps,
    currentStepIndex,
    currentFrame,
    isPlaying,
    speed,
    setSpeed,
    handleStart,
    handleReset,
    stepForward,
    stepBackward,
    togglePlay,
  };
}
