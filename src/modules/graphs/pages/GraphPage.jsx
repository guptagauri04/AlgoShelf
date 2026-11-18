import { ArrowLeft, BookOpen, Network } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useGraphVisualizer from "../hooks/useGraphVisualizer";
import GraphCanvas from "../components/GraphCanvas";
import GraphRepresentationCard from "../components/GraphRepresentationCard";
import GraphControls from "../components/GraphControls";
import GraphStepCard from "../components/GraphStepCard";

export default function GraphPage() {
  const visualizer = useGraphVisualizer();
  const frame = visualizer.currentFrame;

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-20 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl space-y-10">
          {/* Navigation Bar */}
          <div>
            <Link
              to="/"
              onClick={() => sessionStorage.setItem("scrollToBookshelf", "true")}
              className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2"
            >
              <ArrowLeft size={16} />
              Back to bookshelf
            </Link>
          </div>

          {/* Editorial Header */}
          <header className="border-b border-[#E8DDD1] pb-10">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A1764E] text-white">
                <Network size={16} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                Book VI · Network Theory
              </p>
            </div>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#1F1B18] sm:text-6xl">
              Graph Theory
              <br />
              <span className="text-[#8B5A2B]">Representation &amp; Traversal</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              Graphs model complex relational networks. Explore how vertices and edges are stored in memory via Adjacency Lists and Matrices, and watch how Breadth-First and Depth-First searches discover interconnected pathways.
            </p>
          </header>

          {/* Graph Canvas */}
          <GraphCanvas
            nodes={visualizer.nodes}
            edges={visualizer.edges}
            currentNode={frame.currentNode}
            activeNeighbor={frame.activeNeighbor}
            visited={frame.visited}
            activeEdge={frame.activeEdge}
          />

          {/* Representation Switcher */}
          <GraphRepresentationCard
            repTab={visualizer.repTab}
            setRepTab={visualizer.setRepTab}
            adjList={visualizer.adjList}
            adjMatrix={visualizer.adjMatrix}
            nodes={visualizer.nodes}
          />

          {/* Controls */}
          <GraphControls
            algorithm={visualizer.algorithm}
            setAlgorithm={visualizer.setAlgorithm}
            startNodeId={visualizer.startNodeId}
            setStartNodeId={visualizer.setStartNodeId}
            nodes={visualizer.nodes}
            isPlaying={visualizer.isPlaying}
            speed={visualizer.speed}
            setSpeed={visualizer.setSpeed}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
            handleStart={visualizer.handleStart}
            handleReset={visualizer.handleReset}
            stepForward={visualizer.stepForward}
            stepBackward={visualizer.stepBackward}
            togglePlay={visualizer.togglePlay}
          />

          {/* Step Execution & Complexity */}
          <GraphStepCard
            frame={frame}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
          />

          {/* Pedagogical Reference Card */}
          <section className="rounded-3xl border border-[#E8DDD1] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
              <BookOpen size={16} />
              <span>Comparative Traversal Analysis</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-[#1F1B18]">
              BFS vs. DFS Architectural Comparison
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl font-bold text-[#1F1B18]">Breadth-First Search (BFS)</h4>
                  <span className="rounded-full bg-[#F4ECE3] px-3 py-1 text-xs font-mono font-bold text-[#8B5A2B]">FIFO Queue</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#6B645D]">
                  <li>• <strong>Strategy:</strong> Explores concentric rings of vertices level-by-level before moving deeper.</li>
                  <li>• <strong>Primary Application:</strong> Finding the unweighted shortest path between source and target.</li>
                  <li>• <strong>Memory Footprint:</strong> Proportional to the maximum width of the graph (branching factor).</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-xl font-bold text-[#1F1B18]">Depth-First Search (DFS)</h4>
                  <span className="rounded-full bg-[#F4ECE3] px-3 py-1 text-xs font-mono font-bold text-[#8B5A2B]">LIFO Stack</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#6B645D]">
                  <li>• <strong>Strategy:</strong> Plunges along each branch until a dead end is reached, then backtracks.</li>
                  <li>• <strong>Primary Application:</strong> Topological sorting, cycle detection, connected components, maze routing.</li>
                  <li>• <strong>Memory Footprint:</strong> Proportional to the maximum depth of the graph (longest path).</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
