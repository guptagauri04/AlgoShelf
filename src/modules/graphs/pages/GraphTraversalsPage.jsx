import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import GraphCanvas from "../components/GraphCanvas";
import GraphRepresentationView from "../components/GraphRepresentationView";
import GraphTraversalControls from "../components/GraphTraversalControls";
import GraphStepExplanation from "../components/GraphStepExplanation";
import { PRESET_GRAPHS } from "../data/graphData";
import { generateBFSSteps, generateDFSSteps } from "../utils/graphTraversals";

export default function GraphTraversalsPage() {
  const [selectedPreset, setSelectedPreset] = useState("connected");
  const [algorithm, setAlgorithm] = useState("BFS"); // 'BFS' | 'DFS'
  const [startNode, setStartNode] = useState("A");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(900);

  const activeGraph = PRESET_GRAPHS[selectedPreset] || PRESET_GRAPHS.connected;

  // Active start node derived to ensure it always exists in current graph
  const activeStartNode = useMemo(() => {
    return activeGraph.nodes.some((n) => n.id === startNode)
      ? startNode
      : activeGraph.nodes[0]?.id || "A";
  }, [activeGraph, startNode]);

  // Compute all step-by-step frames for current graph & algorithm
  const steps = useMemo(() => {
    return algorithm === "BFS"
      ? generateBFSSteps(activeGraph.nodes, activeGraph.edges, activeStartNode, activeGraph.directed)
      : generateDFSSteps(activeGraph.nodes, activeGraph.edges, activeStartNode, activeGraph.directed);
  }, [algorithm, activeGraph, activeStartNode]);

  // Safe boundary check
  const safeIndex = Math.min(currentStepIndex, Math.max(0, steps.length - 1));
  const currentStep = steps[safeIndex] || null;

  // Animation interval driver
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying, steps.length, speed]);

  const handleAlgorithmChange = (newAlgo) => {
    setAlgorithm(newAlgo);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handlePresetChange = (newPreset) => {
    setSelectedPreset(newPreset);
    const newGraph = PRESET_GRAPHS[newPreset] || PRESET_GRAPHS.connected;
    setStartNode(newGraph.nodes[0]?.id || "A");
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handleStartNodeChange = (newStart) => {
    setStartNode(newStart);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleStepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleStepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        {/* Navigation Breadcrumb */}
        <Link
          to="/learn/graphs"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E]"
        >
          <ArrowLeft size={16} />
          Back to Graphs Overview
        </Link>

        {/* Page Header */}
        <header className="mt-8 border-b border-[#E8DDD1] pb-8 md:mt-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#FAEAE0] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#A65B38]">
              Book V · Chapter I
            </span>
            <span className="text-xs text-[#8C837B]">Interactive Laboratory</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
            Graph Representation &amp; Traversal
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
            Explore vertices and edges through interactive <strong>Adjacency Lists</strong> and{" "}
            <strong>Adjacency Matrices</strong>, then watch radial <strong>BFS</strong> and deep{" "}
            <strong>DFS</strong> branch through connected and disconnected graphs.
          </p>
        </header>

        {/* Traversal Controls Bar */}
        <section className="mt-8">
          <GraphTraversalControls
            algorithm={algorithm}
            onAlgorithmChange={handleAlgorithmChange}
            presetId={selectedPreset}
            onPresetChange={handlePresetChange}
            presets={PRESET_GRAPHS}
            startNode={activeStartNode}
            onStartNodeChange={handleStartNodeChange}
            nodes={activeGraph.nodes}
            isPlaying={isPlaying}
            onPlayPause={handlePlayPause}
            onStepForward={handleStepForward}
            onStepBackward={handleStepBackward}
            onReset={handleReset}
            speed={speed}
            onSpeedChange={setSpeed}
            isFinished={currentStepIndex >= steps.length - 1}
            currentStepIndex={safeIndex}
            totalSteps={steps.length}
          />
        </section>

        {/* Main Interactive Stage: Canvas & Representation View */}
        <section className="mt-6 grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1 text-xs text-[#6B5B4D]">
              <span className="font-semibold uppercase tracking-wider">
                Graph Canvas ({activeGraph.directed ? "Directed" : "Undirected"})
              </span>
              <span>Click a node to inspect or change start</span>
            </div>

            <GraphCanvas
              nodes={activeGraph.nodes}
              edges={activeGraph.edges}
              directed={activeGraph.directed}
              currentNode={currentStep?.currentNode}
              targetNode={currentStep?.targetNode}
              visited={currentStep?.visited || []}
              queueOrStack={
                algorithm === "BFS" ? currentStep?.queue : currentStep?.callStack
              }
              activeTreeEdges={currentStep?.activeTreeEdges || []}
              highlightEdge={currentStep?.highlightEdge}
              startNode={activeStartNode}
              onNodeClick={(id) => {
                if (!isPlaying) handleStartNodeChange(id);
              }}
            />

            {/* Traversal Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 rounded-xl border border-[#EEE5DB] bg-white p-3 text-xs text-[#6B5B4D]">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#D97706]" />
                <span>Current Vertex</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#4B7754]" />
                <span>Visited</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#EADCCB] border border-[#A1764E]" />
                <span>In Queue/Stack</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-5 rounded bg-[#4B7754]" />
                <span>Tree Edge</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-1 w-5 rounded bg-[#D97706]" />
                <span>Inspecting Edge</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <GraphRepresentationView
              nodes={activeGraph.nodes}
              edges={activeGraph.edges}
              directed={activeGraph.directed}
              currentNode={currentStep?.currentNode}
              visited={currentStep?.visited || []}
            />
          </div>
        </section>

        {/* Step Explanation & Queue/Stack Inspector */}
        <section className="mt-6">
          <GraphStepExplanation
            algorithm={algorithm}
            currentStep={currentStep}
            traversalOrder={currentStep?.traversalOrder || []}
          />
        </section>

        {/* Theoretical Deep Dive & Comparison Table */}
        <section className="mt-16 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles size={20} className="text-[#A1764E]" />
            <h2 className="font-display text-2xl text-[#1F1B18]">
              Algorithm Comparison: BFS vs. DFS
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-body text-sm">
              <thead>
                <tr className="border-b border-[#E8DDD1] bg-[#F7F2EB] text-left text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
                  <th className="p-3.5">Property</th>
                  <th className="p-3.5">Breadth-First Search (BFS)</th>
                  <th className="p-3.5">Depth-First Search (DFS)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEE5DB]">
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Auxiliary Data Structure</td>
                  <td className="p-3.5 font-mono text-[#A1764E]">FIFO Queue</td>
                  <td className="p-3.5 font-mono text-[#A1764E]">LIFO Stack (or Call Stack)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Exploration Strategy</td>
                  <td className="p-3.5 text-[#6B645D]">Radial expansion layer by layer</td>
                  <td className="p-3.5 text-[#6B645D]">Deep diving along paths before backtracking</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Time Complexity</td>
                  <td className="p-3.5 font-mono text-[#4B7754]">O(V + E)</td>
                  <td className="p-3.5 font-mono text-[#4B7754]">O(V + E)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Space Complexity</td>
                  <td className="p-3.5 font-mono text-[#6B645D]">O(V) (Queue holds maximum breadth)</td>
                  <td className="p-3.5 font-mono text-[#6B645D]">O(V) (Stack holds maximum depth)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Shortest Path (Unweighted)</td>
                  <td className="p-3.5 text-[#4B7754] font-semibold">Yes, optimal minimum hop path</td>
                  <td className="p-3.5 text-[#8C837B]">No guarantee of shortest hop distance</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#1F1B18]">Common Applications</td>
                  <td className="p-3.5 text-[#6B645D]">Shortest path, web crawling, social network degree</td>
                  <td className="p-3.5 text-[#6B645D]">Cycle detection, topological sort, maze solving</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
