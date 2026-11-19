import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  FastForward,
  Navigation,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import GraphCanvas from "../components/GraphCanvas";
import { graphContent } from "../data/graphContent";
import {
  DEFAULT_NODES,
  DEFAULT_WEIGHTED_EDGES,
  generateDijkstraSteps,
} from "../utils/graphEngine";

export default function DijkstraPage() {
  const [nodes] = useState(DEFAULT_NODES);
  const [edges] = useState(DEFAULT_WEIGHTED_EDGES);
  const [isDirected, setIsDirected] = useState(true);
  const [sourceId, setSourceId] = useState("A");
  const [targetId, setTargetId] = useState("F");

  const [speedMs, setSpeedMs] = useState(800);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef(null);

  const steps = useMemo(() => {
    return generateDijkstraSteps(nodes, edges, sourceId, targetId, isDirected);
  }, [nodes, edges, sourceId, targetId, isDirected]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
  }, []);

  const handleSourceChange = (newSource) => {
    stopPlayback();
    setSourceId(newSource);
    setCurrentStepIndex(-1);
  };

  const handleTargetChange = (newTarget) => {
    stopPlayback();
    setTargetId(newTarget);
    setCurrentStepIndex(-1);
  };

  const handleToggleDirected = (directed) => {
    stopPlayback();
    setIsDirected(directed);
    setCurrentStepIndex(-1);
  };

  // Playback timer
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speedMs);
    }

    return () => {
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      if (currentStepIndex >= steps.length - 1) {
        setCurrentStepIndex(0);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
      setIsPlaying(true);
    }
  };

  const handleStepForward = () => {
    stopPlayback();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    stopPlayback();
    setCurrentStepIndex(-1);
  };

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : null;

  const activeNodeId = currentStep ? currentStep.activeNodeId : null;
  const candidateNodeId = currentStep ? currentStep.candidateNodeId : null;
  const visitedIds = currentStep ? currentStep.visitedIds : [];
  const shortestPathEdges = currentStep ? currentStep.shortestPathEdges : [];
  const finalPath = currentStep?.finalPath || [];
  const distances = currentStep ? currentStep.distances : null;
  const previous = currentStep ? currentStep.previous : {};
  const isFinished = currentStepIndex === steps.length - 1 && steps.length > 0;
  const totalCost = currentStep?.totalCost;

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-serif text-[#1F1B18]">
      {/* Header */}
      <header className="border-b border-[#E8DDD1] bg-[#FCFBF8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/learn/graphs"
            className="group flex items-center gap-2 font-sans text-sm font-medium text-[#6B5B4D] transition-colors hover:text-[#1F1B18]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Graphs &amp; Networks</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A1764E]">
            <BookOpen size={14} />
            <span>Book V &bull; Chapter II</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Title */}
        <section className="mb-10 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Shortest Path Laboratory
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#1F1B18] md:text-5xl">
            Dijkstra&apos;s Shortest Path Algorithm
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-base text-[#6B5B4D]">
            Witness greedy relaxation in action as Dijkstra iteratively settles
            minimal edge costs to find the globally optimal route.
          </p>
        </section>

        {/* Path Configuration Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          {/* Source Selector */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2 shadow-sm">
            <span className="font-sans text-xs font-semibold text-[#8C837B]">
              Source Vertex:
            </span>
            <div className="flex gap-1">
              {nodes.map((n) => (
                <button
                  key={`src-${n.id}`}
                  onClick={() => handleSourceChange(n.id)}
                  className={`h-7 w-7 rounded-lg font-mono text-xs font-bold transition-all ${
                    sourceId === n.id
                      ? "bg-[#3D5A37] text-white"
                      : "bg-white text-[#6B5B4D] hover:bg-[#EAF2E8]"
                  }`}
                >
                  {n.id}
                </button>
              ))}
            </div>
          </div>

          {/* Destination Selector */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2 shadow-sm">
            <span className="font-sans text-xs font-semibold text-[#8C837B]">
              Target Vertex:
            </span>
            <div className="flex gap-1">
              {nodes.map((n) => (
                <button
                  key={`tgt-${n.id}`}
                  onClick={() => handleTargetChange(n.id)}
                  className={`h-7 w-7 rounded-lg font-mono text-xs font-bold transition-all ${
                    targetId === n.id
                      ? "bg-[#A1764E] text-white"
                      : "bg-white text-[#6B5B4D] hover:bg-[#FAF0E6]"
                  }`}
                >
                  {n.id}
                </button>
              ))}
            </div>
          </div>

          {/* Directed vs Undirected */}
          <div className="flex rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 shadow-sm">
            <button
              onClick={() => handleToggleDirected(true)}
              className={`rounded-xl px-3.5 py-1.5 font-sans text-xs font-semibold transition-all ${
                isDirected
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Directed
            </button>
            <button
              onClick={() => handleToggleDirected(false)}
              className={`rounded-xl px-3.5 py-1.5 font-sans text-xs font-semibold transition-all ${
                !isDirected
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Undirected
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Canvas & Controls (2 Columns) */}
          <div className="space-y-6 lg:col-span-2">
            <GraphCanvas
              nodes={nodes}
              edges={edges}
              isDirected={isDirected}
              showWeights={true}
              activeNodeId={activeNodeId}
              candidateNodeId={candidateNodeId}
              visitedIds={visitedIds}
              shortestPathEdges={shortestPathEdges}
              finalPath={finalPath}
              distances={distances}
              message={
                currentStep
                  ? {
                      type: isFinished ? "success" : "info",
                      text: currentStep.description,
                    }
                  : null
              }
            />

            {/* Path Outcome Box */}
            {isFinished && (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#5A7354]/30 bg-[#EAF2E8] p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3D5A37] text-white">
                    <Navigation size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-[#3D5A37]">
                      Optimal Route Discovered
                    </h4>
                    <p className="font-mono text-xs font-bold text-[#1F1B18]">
                      {finalPath.length > 0
                        ? finalPath.join(" → ")
                        : "No Route Exists"}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[#5A7354]/40 bg-white px-4 py-2 text-right">
                  <span className="block font-sans text-[10px] uppercase tracking-wider text-[#8C837B]">
                    Total Weight Cost
                  </span>
                  <span className="font-mono text-xl font-bold text-[#3D5A37]">
                    {totalCost !== undefined && totalCost !== Infinity
                      ? totalCost
                      : "∞"}
                  </span>
                </div>
              </div>
            )}

            {/* Distance Table */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-[#1F1B18]">
                    Tentative &amp; Settled Distance Table
                  </h3>
                  <p className="font-sans text-xs text-[#8C837B]">
                    Current shortest known distances relative to origin vertex{" "}
                    <strong>{sourceId}</strong>.
                  </p>
                </div>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-1 font-mono text-xs text-[#6B5B4D]">
                  {visitedIds.length} / {nodes.length} Settled
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse font-mono text-xs">
                  <thead>
                    <tr className="border-b border-[#E8DDD1] text-left text-[#A1764E]">
                      <th className="pb-2">Vertex</th>
                      <th className="pb-2">Min Distance</th>
                      <th className="pb-2">Previous Predecessor</th>
                      <th className="pb-2 text-right">Settled Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nodes.map((n) => {
                      const d = distances ? distances[n.id] : Infinity;
                      const prev = previous ? previous[n.id] : null;
                      const isSettled = visitedIds.includes(n.id);
                      const isCurrent = n.id === activeNodeId;

                      return (
                        <tr
                          key={`dist-${n.id}`}
                          className={`border-b border-[#F0EBE4] transition-colors ${
                            isCurrent
                              ? "bg-[#FEF9EE]"
                              : isSettled
                              ? "bg-[#FCFBF8]"
                              : ""
                          }`}
                        >
                          <td className="py-2.5 font-bold text-[#1F1B18]">
                            {n.id} {n.id === sourceId && "(Source)"}{" "}
                            {n.id === targetId && "(Target)"}
                          </td>
                          <td className="py-2.5">
                            <span
                              className={`rounded px-2 py-0.5 font-bold ${
                                d !== Infinity
                                  ? "bg-[#FAF0E6] text-[#A1764E]"
                                  : "text-[#8C837B]"
                              }`}
                            >
                              {d === Infinity ? "∞" : d}
                            </span>
                          </td>
                          <td className="py-2.5 text-[#6B5B4D]">
                            {prev ? prev : "—"}
                          </td>
                          <td className="py-2.5 text-right">
                            {isSettled ? (
                              <span className="rounded-full bg-[#EAF2E8] px-2.5 py-1 text-[11px] font-semibold text-[#3D5A37]">
                                Settled
                              </span>
                            ) : (
                              <span className="rounded-full bg-[#FCFBF8] px-2.5 py-1 text-[11px] text-[#8C837B]">
                                Tentative
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handlePlayToggle}
                  className="flex items-center gap-2 rounded-2xl bg-[#A1764E] px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8B5A2B]"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? "Pause" : "Play Dijkstra"}</span>
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={currentStepIndex >= steps.length - 1}
                  className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-sans text-sm font-medium text-[#1F1B18] transition-colors hover:bg-white disabled:opacity-40"
                >
                  <FastForward size={16} />
                  <span>Step Forward</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-sans text-sm font-medium text-[#6B5B4D] transition-colors hover:bg-white"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Pace Slider */}
              <div className="flex items-center gap-3 font-sans text-xs text-[#6B5B4D]">
                <Clock3 size={15} className="text-[#A1764E]" />
                <span>Pace:</span>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="100"
                  value={speedMs}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                  className="h-1.5 w-24 cursor-pointer accent-[#A1764E]"
                />
                <span className="font-mono">{speedMs}ms</span>
              </div>
            </div>
          </div>

          {/* Right Theory & Pseudocode */}
          <div className="space-y-6">
            {/* Algorithm Info */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                <Sparkles size={16} />
                <span>Greedy Optimization</span>
              </div>

              <h3 className="mt-2 font-display text-2xl text-[#1F1B18]">
                {graphContent.dijkstra.title}
              </h3>

              <div className="mt-3 rounded-2xl border border-[#A1764E]/20 bg-[#FAF7F2] p-3 text-center">
                <span className="font-mono text-xs font-bold text-[#A1764E]">
                  Relaxation Condition
                </span>
                <pre className="mt-1 font-mono text-[11px] leading-tight text-[#6B5B4D]">
                  {graphContent.dijkstra.relaxationRule}
                </pre>
              </div>

              <p className="mt-4 font-serif text-sm leading-relaxed text-[#6B5B4D]">
                {graphContent.dijkstra.desc}
              </p>

              <div className="mt-5 border-t border-[#EEE5DB] pt-4">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
                  Complexity Profile
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-2.5 text-center">
                    <span className="block text-[10px] text-[#8C837B]">Time</span>
                    <span className="font-bold text-[#3D5A37]">
                      O((V + E) log V)
                    </span>
                  </div>
                  <div className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-2.5 text-center">
                    <span className="block text-[10px] text-[#8C837B]">Space</span>
                    <span className="font-bold text-[#8B5A2B]">O(V)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pseudocode */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                  <Code2 size={16} />
                  <span>Dijkstra Routine</span>
                </div>
                <span className="font-mono text-[10px] text-[#8C837B]">
                  Pseudocode
                </span>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-[#E8DDD1] bg-[#1F1B18] p-4 font-mono text-xs leading-relaxed text-[#F7F5F2]">
                <code>{graphContent.dijkstra.pseudocode}</code>
              </pre>
            </div>

            {/* Critical Constraint */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FAF7F2] p-6">
              <h4 className="font-display text-lg text-[#1F1B18]">
                Key Takeaways
              </h4>
              <ul className="mt-3 space-y-2.5 font-serif text-xs text-[#6B5B4D]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>Non-negative Weights Only:</strong> Dijkstra relies
                    on greedy settlement; if negative edge weights exist, use
                    the Bellman-Ford algorithm instead.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>Greedy Correctness:</strong> Once a vertex is settled
                    from the priority queue, its computed shortest distance is
                    mathematically guaranteed to be final.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
