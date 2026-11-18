import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  GRAPH_PRESETS,
  getAdjacencyList,
  getAdjacencyMatrix,
  generateBFSSteps,
  generateDFSSteps,
} from "../utils/graphOperations";

export default function useGraphVisualizer() {
  const [presetKey, setPresetKey] = useState("connectedCycle");
  const preset = GRAPH_PRESETS[presetKey] || GRAPH_PRESETS.connectedCycle;

  const [nodes, setNodes] = useState(preset.nodes);
  const [edges, setEdges] = useState(preset.edges);
  const [isDirected, setIsDirected] = useState(preset.isDirected);
  const [startNodeId, setStartNodeId] = useState(preset.defaultStart);
  const [algorithm, setAlgorithm] = useState("bfs"); // "bfs" | "dfs"

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5, 1, 2
  const [activeTab, setActiveTab] = useState("canvas"); // "canvas" | "adjList" | "adjMatrix"

  // Whenever preset changes, synchronize nodes, edges, directedness, and startNode
  const loadPreset = useCallback((key) => {
    const targetPreset = GRAPH_PRESETS[key];
    if (!targetPreset) return;
    setIsPlaying(false);
    setPresetKey(key);
    setNodes(targetPreset.nodes);
    setEdges(targetPreset.edges);
    setIsDirected(targetPreset.isDirected);
    setStartNodeId(targetPreset.defaultStart);
    setCurrentStepIndex(0);
  }, []);

  // Compute steps dynamically
  const steps = useMemo(() => {
    if (algorithm === "dfs") {
      return generateDFSSteps(nodes, edges, startNodeId, isDirected);
    }
    return generateBFSSteps(nodes, edges, startNodeId, isDirected);
  }, [algorithm, nodes, edges, startNodeId, isDirected]);

  // Representations
  const adjacencyList = useMemo(
    () => getAdjacencyList(nodes, edges, isDirected),
    [nodes, edges, isDirected]
  );

  const adjacencyMatrix = useMemo(
    () => getAdjacencyMatrix(nodes, edges, isDirected),
    [nodes, edges, isDirected]
  );

  const currentFrame = steps[currentStepIndex] || steps[0];

  // Playback timer
  const timerRef = useRef(null);

  const goToNextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      if (prev < steps.length - 1) {
        return prev + 1;
      }
      setIsPlaying(false);
      return prev;
    });
  }, [steps.length]);

  const goToPreviousStep = useCallback(() => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const jumpToStep = useCallback(
    (index) => {
      if (index >= 0 && index < steps.length) {
        setIsPlaying(false);
        setCurrentStepIndex(index);
      }
    },
    [steps.length]
  );

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStepIndex >= steps.length - 1) {
        setCurrentStepIndex(0);
      }
      setIsPlaying(true);
    }
  }, [isPlaying, currentStepIndex, steps.length]);

  // Interval execution
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalTime = Math.max(300, Math.round(1100 / speed));
    timerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(timerRef.current);
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  return {
    presetKey,
    preset,
    loadPreset,
    nodes,
    edges,
    isDirected,
    setIsDirected: (dir) => {
      setIsPlaying(false);
      setIsDirected(dir);
      setCurrentStepIndex(0);
    },
    startNodeId,
    setStartNodeId: (id) => {
      setIsPlaying(false);
      setStartNodeId(id);
      setCurrentStepIndex(0);
    },
    algorithm,
    setAlgorithm: (algo) => {
      setIsPlaying(false);
      setAlgorithm(algo);
      setCurrentStepIndex(0);
    },
    steps,
    currentStepIndex,
    currentFrame,
    isPlaying,
    speed,
    setSpeed,
    activeTab,
    setActiveTab,
    adjacencyList,
    adjacencyMatrix,
    goToNextStep,
    goToPreviousStep,
    reset,
    jumpToStep,
    togglePlayback,
  };
}
