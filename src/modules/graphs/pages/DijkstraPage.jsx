import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "../../../components/Footer";
import GraphVisualizer from "../components/GraphVisualizer";
import DijkstraControls from "../components/DijkstraControls";
import DijkstraStepExplanation from "../components/DijkstraStepExplanation";
import DijkstraDistanceTable from "../components/DijkstraDistanceTable";
import useDijkstraAnimation from "../hooks/useDijkstraAnimation";
import { dijkstraSteps, DEFAULT_GRAPH } from "../utils/dijkstraHelpers";
import { dijkstraContent } from "../data/dijkstraContent";

// Shared components from searching module (safe to reuse)
import CodeBlock from "../../searching/components/CodeBlock";
import ComplexityCard from "../../searching/components/ComplexityCard";
import TheorySection from "../../searching/components/TheorySection";

export default function DijkstraPage() {
  const [source, setSource] = useState("A");
  const [destination, setDestination] = useState("G");
  const [steps, setSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const animation = useDijkstraAnimation(steps, 800);

  const handleStart = () => {
    const result = dijkstraSteps(DEFAULT_GRAPH, source, destination);
    setSteps(result.steps);
    setIsRunning(true);
    animation.reset();
    animation.play();
  };

  const handleReset = () => {
    animation.reset();
    setIsRunning(false);
    setSteps([]);
  };

  const handleRandomize = () => {
    handleReset();
    const nodes = DEFAULT_GRAPH.nodes;
    const idx1 = Math.floor(Math.random() * nodes.length);
    let idx2 = Math.floor(Math.random() * nodes.length);
    if (idx2 === idx1) idx2 = (idx1 + 1) % nodes.length;
    setSource(nodes[idx1]);
    setDestination(nodes[idx2]);
  };

  const currentFrame = animation.currentFrame;

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Hero */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/graphs"
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
                  BOOK IV · {dijkstraContent.chapter}
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl md:text-8xl">
                {dijkstraContent.title}
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
                  "The shortest path between two points passes through the fewest hesitations — always choosing the nearest certainty over distant possibility."
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 10 min read
                </span>
                <span className="rounded-full bg-amber-100 px-3.5 py-1.5 font-medium text-amber-700">
                  Intermediate
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  Non-negative weights only
                </span>
              </div>
            </div>

            {/* Quick facts card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-[#8C837B]">Quick Facts</p>
              <ul className="mt-4 space-y-3">
                {dijkstraContent.takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#5F5952]">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#A1764E]" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-2xl border border-[#EEE5DB] bg-[#FAF8F5] p-4">
                <p className="text-xs uppercase tracking-wider text-[#8C837B]">
                  Complexity Highlights
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Time:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(E log V)</strong>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Space:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(V + E)</strong>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("interactive-visualizer")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1F1B18] py-3 text-sm font-medium text-white transition hover:bg-[#342D28]"
              >
                Jump to Visualizer
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Section */}
      <main id="interactive-visualizer" className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">

        {/* Controls */}
        <DijkstraControls
          source={source}
          setSource={(v) => { setSource(v); handleReset(); }}
          destination={destination}
          setDestination={(v) => { setDestination(v); handleReset(); }}
          nodes={DEFAULT_GRAPH.nodes}
          onStart={handleStart}
          playing={animation.playing}
          onPlayPause={animation.togglePlayPause}
          onNext={animation.nextStep}
          onPrev={animation.prevStep}
          onReset={handleReset}
          onRandomize={handleRandomize}
          currentStep={animation.currentStep}
          totalSteps={animation.totalSteps}
          speed={animation.speed}
          onSpeedChange={animation.setSpeed}
          isRunning={isRunning}
        />

        {/* Graph Visualizer */}
        <GraphVisualizer
          graph={DEFAULT_GRAPH}
          frame={currentFrame}
          source={source}
          destination={destination}
        />

        {/* Step Explanation + Distance Table */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <DijkstraStepExplanation
            frame={currentFrame}
            currentStep={animation.currentStep}
            totalSteps={animation.totalSteps}
          />
          <DijkstraDistanceTable
            nodes={DEFAULT_GRAPH.nodes}
            frame={currentFrame}
          />
        </div>

        {/* Pseudocode */}
        <CodeBlock
          pseudocode={dijkstraContent.pseudocode}
          currentLine={-1}
        />

        {/* Complexity Analysis */}
        <section className="pt-8 border-t border-[#ECE3D8]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
            Performance Analysis
          </p>
          <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
            Complexity Breakdown
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#6B645D]">
            Understand how Dijkstra's Algorithm scales as your graph grows from a city map to a planetary network.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ComplexityCard
              title="Best Case"
              value={dijkstraContent.complexity.best}
              subtitle="With a binary min-heap priority queue"
            />
            <ComplexityCard
              title="Average Case"
              value={dijkstraContent.complexity.average}
              subtitle="Sparse graphs with E ≈ V log V"
            />
            <ComplexityCard
              title="Worst Case"
              value={dijkstraContent.complexity.worst}
              subtitle="Dense graphs with simple array queue"
            />
            <ComplexityCard
              title="Auxiliary Space"
              value={dijkstraContent.complexity.space}
              subtitle="Stores distances and predecessor map"
            />
          </div>
        </section>

        {/* Theory Section */}
        <section className="pt-6">
          <TheorySection content={dijkstraContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
