import { ArrowLeft, Network, Route } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useDijkstraVisualizer from "../hooks/useDijkstraVisualizer";
import DijkstraCanvas from "../components/DijkstraCanvas";
import DijkstraControls from "../components/DijkstraControls";
import DijkstraTable from "../components/DijkstraTable";
import DijkstraStepCard from "../components/DijkstraStepCard";
import CodeBlock from "../../searching/components/CodeBlock";
import ComplexityCard from "../../searching/components/ComplexityCard";
import TheorySection from "../../searching/components/TheorySection";
import { dijkstraContent } from "../data/dijkstraContent";

export default function DijkstraPage() {
  const visualizer = useDijkstraVisualizer();
  const frame = visualizer.currentFrame;

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Hero */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/learn/graphs"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Graphs Shelf
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  Book VI · Shortest Path Routing
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl md:text-8xl">
                Dijkstra&apos;s
                <br />
                Algorithm
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {dijkstraContent.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 max-w-xl border-l-2 border-[#DDD2C5] pl-6 text-[#5F5952]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                  Editorial Note
                </p>
                <p className="mt-2 text-base leading-7 italic">
                  “The shortest path between two points in a complex network is rarely a straight line. It is the sequence of choices that honors the accumulated weight of the journey.”
                </p>
              </div>
            </div>

            {/* Quick Intuition Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Route size={16} />
                Shortest Path Principle
              </div>
              <p className="mt-3 text-sm leading-6 text-[#5F5952]">
                Like water finding the path of least resistance through a network of pipes, Dijkstra&apos;s algorithm expands outward from the source, settling each junction as soon as its shortest possible arrival time is confirmed.
              </p>

              <div className="mt-6 rounded-2xl border border-[#EEE5DB] bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-[#8C837B]">
                  Complexity Standard
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Time:</span>{" "}
                    <strong className="text-xs text-[#1F1B18]">O((V+E) log V)</strong>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Space:</span>{" "}
                    <strong className="text-xs text-[#1F1B18]">O(V + E)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Workspace */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        {/* Graph Canvas */}
        <DijkstraCanvas
          nodes={visualizer.nodes}
          edges={visualizer.edges}
          sourceId={visualizer.sourceId}
          destId={visualizer.destId}
          currentNode={frame.currentNode}
          activeNeighbor={frame.activeNeighbor}
          activeEdge={frame.activeEdge}
          visited={frame.visited || []}
          distances={frame.distances || {}}
          shortestPath={frame.shortestPath || []}
          shortestPathEdges={frame.shortestPathEdges || []}
        />

        {/* Controls */}
        <DijkstraControls
          nodes={visualizer.nodes}
          sourceId={visualizer.sourceId}
          setSourceId={visualizer.setSourceId}
          destId={visualizer.destId}
          setDestId={visualizer.setDestId}
          selectedPreset={visualizer.selectedPreset}
          setSelectedPreset={visualizer.setSelectedPreset}
          presets={visualizer.presets}
          isPlaying={visualizer.isPlaying}
          togglePlay={visualizer.togglePlay}
          stepForward={visualizer.stepForward}
          stepBackward={visualizer.stepBackward}
          handleReset={visualizer.handleReset}
          currentStepIndex={visualizer.currentStepIndex}
          totalSteps={visualizer.steps.length}
          speed={visualizer.speed}
          setSpeed={visualizer.setSpeed}
          totalCost={frame.totalCost}
          shortestPath={frame.shortestPath}
        />

        {/* Step Explanation & Live Distance Table */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <DijkstraStepCard
            frame={frame}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
          />

          <DijkstraTable
            nodes={visualizer.nodes}
            distances={frame.distances}
            previous={frame.previous}
            visited={frame.visited}
            currentNode={frame.currentNode}
            activeNeighbor={frame.activeNeighbor}
            shortestPath={frame.shortestPath}
          />
        </div>

        {/* Pseudocode Trace */}
        <CodeBlock
          pseudocode={dijkstraContent.pseudocode}
          currentLine={frame.currentLine || -1}
        />

        {/* Complexity Analysis Cards */}
        <section className="pt-8 border-t border-[#ECE3D8]">
          <div className="flex items-center gap-2">
            <Network size={16} className="text-[#A1764E]" />
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
              Performance Analysis
            </p>
          </div>
          <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
            Complexity Breakdown
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#6B645D]">
            Examine how Dijkstra&apos;s algorithm achieves logarithmic priority updates using binary heaps.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ComplexityCard
              title="Time (Min-Heap)"
              value={dijkstraContent.complexity.time}
              subtitle="Each vertex extracted and edge relaxed in O(log V)"
            />
            <ComplexityCard
              title="Time (Array)"
              value="O(V²)"
              subtitle="Linear scans without priority queue indexing"
            />
            <ComplexityCard
              title="Auxiliary Space"
              value={dijkstraContent.complexity.space}
              subtitle="Distance maps, predecessor arrays, and frontier queue"
            />
            <ComplexityCard
              title="Edge Constraint"
              value="Weights ≥ 0"
              subtitle="Requires strictly non-negative edge costs"
            />
          </div>
        </section>

        {/* Comprehensive Theory */}
        <section className="pt-6">
          <TheorySection content={dijkstraContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
