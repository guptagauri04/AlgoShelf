import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  FastForward,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Table,
  ListOrdered,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import GraphCanvas from "../components/GraphCanvas";
import { graphContent } from "../data/graphContent";
import {
  DEFAULT_NODES,
  DEFAULT_UNWEIGHTED_EDGES,
  buildAdjacencyList,
  buildAdjacencyMatrix,
  generateBFSSteps,
  generateDFSSteps,
} from "../utils/graphEngine";

export default function GraphTraversalPage() {
  const [nodes] = useState(DEFAULT_NODES);
  const [edges] = useState(DEFAULT_UNWEIGHTED_EDGES);
  const [isDirected, setIsDirected] = useState(false);
  const [traversalType, setTraversalType] = useState("bfs"); // "bfs" | "dfs"
  const [startNodeId, setStartNodeId] = useState("A");
  const [representationTab, setRepresentationTab] = useState("list"); // "list" | "matrix"

  const [speedMs, setSpeedMs] = useState(700);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef(null);

  const algorithmInfo =
    graphContent.traversals.algorithms.find((a) => a.id === traversalType) ||
    graphContent.traversals.algorithms[0];

  const adjList = useMemo(
    () => buildAdjacencyList(nodes, edges, isDirected),
    [nodes, edges, isDirected]
  );

  const adjMatrix = useMemo(
    () => buildAdjacencyMatrix(nodes, edges, isDirected),
    [nodes, edges, isDirected]
  );

  const steps = useMemo(() => {
    return traversalType === "bfs"
      ? generateBFSSteps(nodes, edges, startNodeId, isDirected)
      : generateDFSSteps(nodes, edges, startNodeId, isDirected);
  }, [nodes, edges, startNodeId, isDirected, traversalType]);

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
  }, []);

  const handleSelectType = (typeId) => {
    stopPlayback();
    setTraversalType(typeId);
    setCurrentStepIndex(-1);
  };

  const handleToggleDirected = (directed) => {
    stopPlayback();
    setIsDirected(directed);
    setCurrentStepIndex(-1);
  };

  const handleSelectStartNode = (nodeId) => {
    stopPlayback();
    setStartNodeId(nodeId);
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
  const activeEdges = currentStep ? currentStep.activeEdges : [];
  const traversalOrder = currentStep ? currentStep.traversalOrder : [];
  const queueOrStack = currentStep ? currentStep.queueOrStack : [];
  const isFinished = currentStepIndex === steps.length - 1 && steps.length > 0;

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
            <span>Book V &bull; Chapter I</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Title */}
        <section className="mb-10 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Graph Traversal Laboratory
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#1F1B18] md:text-5xl">
            BFS, DFS &amp; Graph Representations
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-base text-[#6B5B4D]">
            Explore fundamental graph exploration algorithms and contrast
            Adjacency Lists against Adjacency Matrices in real-time.
          </p>
        </section>

        {/* Global Configuration Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          {/* BFS / DFS Switcher */}
          <div className="flex rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 shadow-sm">
            <button
              onClick={() => handleSelectType("bfs")}
              className={`rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all ${
                traversalType === "bfs"
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Breadth-First Search (BFS)
            </button>
            <button
              onClick={() => handleSelectType("dfs")}
              className={`rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all ${
                traversalType === "dfs"
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Depth-First Search (DFS)
            </button>
          </div>

          {/* Directed / Undirected Toggle */}
          <div className="flex rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 shadow-sm">
            <button
              onClick={() => handleToggleDirected(false)}
              className={`rounded-xl px-3.5 py-2 font-sans text-xs font-semibold transition-all ${
                !isDirected
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Undirected
            </button>
            <button
              onClick={() => handleToggleDirected(true)}
              className={`rounded-xl px-3.5 py-2 font-sans text-xs font-semibold transition-all ${
                isDirected
                  ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              Directed
            </button>
          </div>

          {/* Origin Node Picker */}
          <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 shadow-sm">
            <span className="font-sans text-xs font-semibold text-[#8C837B]">
              Origin:
            </span>
            <div className="flex gap-1">
              {nodes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleSelectStartNode(n.id)}
                  className={`h-7 w-7 rounded-lg font-mono text-xs font-bold transition-all ${
                    startNodeId === n.id
                      ? "bg-[#A1764E] text-white"
                      : "bg-white text-[#6B5B4D] hover:bg-[#FAF0E6]"
                  }`}
                >
                  {n.id}
                </button>
              ))}
            </div>
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
              showWeights={false}
              activeNodeId={activeNodeId}
              candidateNodeId={candidateNodeId}
              visitedIds={visitedIds}
              activeEdges={activeEdges}
              message={
                currentStep
                  ? {
                      type: isFinished ? "success" : "info",
                      text: currentStep.description,
                    }
                  : null
              }
            />

            {/* Traversal State (FIFO Queue / LIFO Stack & Traversal Order) */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Working Memory Box */}
              <div className="rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                    {traversalType === "bfs"
                      ? "FIFO Queue (Front → Rear)"
                      : "Call Stack (Top)"}
                  </span>
                  <span className="font-mono text-xs text-[#8C837B]">
                    size: {queueOrStack.length}
                  </span>
                </div>
                <div className="flex min-h-[44px] flex-wrap items-center gap-2 rounded-xl border border-dashed border-[#E8DDD1] bg-[#FCFBF8] p-2.5">
                  {queueOrStack.length > 0 ? (
                    queueOrStack.map((item, idx) => (
                      <span
                        key={`${item}-${idx}`}
                        className="rounded-lg border border-[#A1764E]/30 bg-white px-2.5 py-1 font-mono text-xs font-bold text-[#1F1B18] shadow-sm"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <span className="font-sans text-xs italic text-[#8C837B]">
                      Empty
                    </span>
                  )}
                </div>
              </div>

              {/* Visited Sequence Box */}
              <div className="rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#3D5A37]">
                    Visited Order
                  </span>
                  <span className="font-mono text-xs text-[#8C837B]">
                    {traversalOrder.length} / {nodes.length}
                  </span>
                </div>
                <div className="flex min-h-[44px] flex-wrap items-center gap-2 rounded-xl border border-dashed border-[#E8DDD1] bg-[#FCFBF8] p-2.5">
                  {traversalOrder.length > 0 ? (
                    traversalOrder.map((item, idx) => (
                      <span
                        key={`ord-${item}-${idx}`}
                        className="rounded-lg border border-[#5A7354]/30 bg-[#EAF2E8] px-2.5 py-1 font-mono text-xs font-bold text-[#3D5A37]"
                      >
                        #{idx + 1}: {item}
                      </span>
                    ))
                  ) : (
                    <span className="font-sans text-xs italic text-[#8C837B]">
                      Pending start
                    </span>
                  )}
                </div>
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
                  <span>{isPlaying ? "Pause" : "Play Traversal"}</span>
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

            {/* Adjacency List & Matrix Dual Representation */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#EEE5DB] pb-4">
                <div>
                  <h3 className="font-display text-xl text-[#1F1B18]">
                    Internal Representation View
                  </h3>
                  <p className="font-sans text-xs text-[#8C837B]">
                    Examine how the underlying graph data structure is mapped in
                    memory.
                  </p>
                </div>

                <div className="flex rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-1">
                  <button
                    onClick={() => setRepresentationTab("list")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-semibold ${
                      representationTab === "list"
                        ? "bg-white text-[#1F1B18] shadow-sm"
                        : "text-[#6B5B4D]"
                    }`}
                  >
                    <ListOrdered size={14} />
                    <span>Adjacency List</span>
                  </button>
                  <button
                    onClick={() => setRepresentationTab("matrix")}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-sans text-xs font-semibold ${
                      representationTab === "matrix"
                        ? "bg-white text-[#1F1B18] shadow-sm"
                        : "text-[#6B5B4D]"
                    }`}
                  >
                    <Table size={14} />
                    <span>Adjacency Matrix</span>
                  </button>
                </div>
              </div>

              {representationTab === "list" ? (
                <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {Object.entries(adjList).map(([nodeId, neighbors]) => (
                    <div
                      key={`adj-${nodeId}`}
                      className={`rounded-xl border p-3 font-mono text-xs ${
                        nodeId === activeNodeId
                          ? "border-[#D39B2A] bg-[#FEF9EE]"
                          : "border-[#E8DDD1] bg-[#FCFBF8]"
                      }`}
                    >
                      <span className="font-bold text-[#A1764E]">{nodeId}</span>
                      <span className="text-[#8C837B]"> &rarr; </span>
                      {neighbors.length > 0 ? (
                        <span>
                          [{neighbors.map((n) => n.to).join(", ")}]
                        </span>
                      ) : (
                        <span className="italic text-[#8C837B]">[] (None)</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-xs">
                    <thead>
                      <tr>
                        <th className="border border-[#E8DDD1] bg-[#FAF7F2] p-2 text-[#A1764E]">
                          V \ V
                        </th>
                        {nodes.map((n) => (
                          <th
                            key={`col-${n.id}`}
                            className="border border-[#E8DDD1] bg-[#FAF7F2] p-2 text-[#1F1B18]"
                          >
                            {n.id}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {nodes.map((row) => (
                        <tr key={`row-${row.id}`}>
                          <td className="border border-[#E8DDD1] bg-[#FAF7F2] p-2 text-center font-bold text-[#A1764E]">
                            {row.id}
                          </td>
                          {nodes.map((col) => {
                            const val = adjMatrix[row.id]?.[col.id] || 0;
                            return (
                              <td
                                key={`cell-${row.id}-${col.id}`}
                                className={`border border-[#E8DDD1] p-2 text-center ${
                                  val > 0
                                    ? "bg-[#EAF2E8] font-bold text-[#3D5A37]"
                                    : "text-[#8C837B]"
                                }`}
                              >
                                {val}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Theory & Pseudocode */}
          <div className="space-y-6">
            {/* Algorithm Info */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                <Sparkles size={16} />
                <span>Traversal Strategy</span>
              </div>

              <h3 className="mt-2 font-display text-2xl text-[#1F1B18]">
                {algorithmInfo.name}
              </h3>

              <div className="mt-3 rounded-2xl border border-[#A1764E]/20 bg-[#FAF7F2] p-3 text-center">
                <span className="font-mono text-xs font-bold text-[#A1764E]">
                  Data Structure: {algorithmInfo.dataStructure}
                </span>
              </div>

              <p className="mt-4 font-serif text-sm leading-relaxed text-[#6B5B4D]">
                {algorithmInfo.desc}
              </p>

              <div className="mt-5 border-t border-[#EEE5DB] pt-4">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
                  Complexity Profile
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-2.5 text-center">
                    <span className="block text-[10px] text-[#8C837B]">Time</span>
                    <span className="font-bold text-[#3D5A37]">O(V + E)</span>
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
                  <span>Algorithm Routine</span>
                </div>
                <span className="font-mono text-[10px] text-[#8C837B]">
                  Pseudocode
                </span>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-[#E8DDD1] bg-[#1F1B18] p-4 font-mono text-xs leading-relaxed text-[#F7F5F2]">
                <code>{algorithmInfo.pseudocode}</code>
              </pre>
            </div>

            {/* Key Comparison */}
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
                    <strong>BFS Shortest Path:</strong> On unweighted graphs,
                    BFS guarantees finding the path with minimum number of edge
                    hops.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>DFS Backtracking:</strong> DFS explores as deep as
                    possible along each branch, forming the foundation of
                    topological sorting and maze solving.
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
