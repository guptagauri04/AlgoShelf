import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  DEFAULT_GRAPH,
  DISCONNECTED_GRAPH,
  dijkstraSteps,
} from "../utils/dijkstraOperations";

const PRESETS = [DEFAULT_GRAPH, DISCONNECTED_GRAPH];

export default function useDijkstraVisualizer() {
  const [selectedPreset, setSelectedPreset] = useState("standard");
  const [sourceId, setSourceId] = useState("A");
  const [destId, setDestId] = useState("F");
  const [speed, setSpeed] = useState(750);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const timerRef = useRef(null);

  const activeGraph = useMemo(() => {
    return PRESETS.find((p) => p.id === selectedPreset) || DEFAULT_GRAPH;
  }, [selectedPreset]);

  // Make sure source and dest are valid for active graph
  useEffect(() => {
    const validIds = activeGraph.nodes.map((n) => n.id);
    if (!validIds.includes(sourceId)) setSourceId(validIds[0]);
    if (!validIds.includes(destId)) setDestId(validIds[validIds.length - 1]);
  }, [activeGraph, sourceId, destId]);

  const steps = useMemo(() => {
    return dijkstraSteps(activeGraph.nodes, activeGraph.edges, sourceId, destId);
  }, [activeGraph, sourceId, destId]);

  const currentFrame = steps[currentStepIndex] || steps[0] || {};

  // Playback timer
  useEffect(() => {
    if (!isPlaying || currentStepIndex >= steps.length - 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (currentStepIndex >= steps.length - 1) setIsPlaying(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        const next = prev + 1;
        if (next >= steps.length - 1) {
          setIsPlaying(false);
          return steps.length - 1;
        }
        return next;
      });
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const togglePlay = useCallback(() => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying((prev) => !prev);
  }, [currentStepIndex, steps.length]);

  const stepForward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const stepBackward = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  const handlePresetChange = useCallback((id) => {
    setIsPlaying(false);
    setSelectedPreset(id);
    setCurrentStepIndex(0);
  }, []);

  const handleSourceChange = useCallback((id) => {
    setIsPlaying(false);
    setSourceId(id);
    setCurrentStepIndex(0);
  }, []);

  const handleDestChange = useCallback((id) => {
    setIsPlaying(false);
    setDestId(id);
    setCurrentStepIndex(0);
  }, []);

  return {
    nodes: activeGraph.nodes,
    edges: activeGraph.edges,
    presets: PRESETS,
    selectedPreset,
    setSelectedPreset: handlePresetChange,
    sourceId,
    setSourceId: handleSourceChange,
    destId,
    setDestId: handleDestChange,
    speed,
    setSpeed,
    isPlaying,
    togglePlay,
    stepForward,
    stepBackward,
    handleReset,
    currentStepIndex,
    steps,
    currentFrame,
  };
}
