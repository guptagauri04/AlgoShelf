import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useGraphVisualizer from "../hooks/useGraphVisualizer";
import GraphCanvas from "../components/GraphCanvas";
import GraphControls from "../components/GraphControls";
import GraphRepresentations from "../components/GraphRepresentations";
import GraphStepExplanation from "../components/GraphStepExplanation";
import GraphTheory from "../components/GraphTheory";

export default function GraphTraversal() {
  const visualizer = useGraphVisualizer();

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-20 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl">
          {/* Back link */}
          <Link
            to="/learn/graphs"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A65B38] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Back to Graphs Overview
          </Link>

          {/* Chapter Header */}
          <header className="mt-10 border-b border-[#E8DDD1] pb-10 md:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A65B38]">
              Book V Â· Chapter I Â· Interactive Lesson
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#1F1B18] sm:text-6xl">
              Graph Representation &amp; Traversal
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              Explore how networks of vertices and edges are stored in memory via
              Adjacency Lists and Matrices. Step through Breadth-First Search
              (BFS) and Depth-First Search (DFS) with real-time queue and stack
              state tracking.
            </p>
          </header>

          {/* Controls & Interactive Visualizer Canvas */}
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <GraphCanvas
              nodes={visualizer.nodes}
              edges={visualizer.edges}
              isDirected={visualizer.isDirected}
              currentFrame={visualizer.currentFrame}
              startNodeId={visualizer.startNodeId}
              onSelectStartNode={visualizer.setStartNodeId}
              algorithm={visualizer.algorithm}
            />

            <GraphControls
              presetKey={visualizer.presetKey}
              onSelectPreset={visualizer.loadPreset}
              algorithm={visualizer.algorithm}
              onSelectAlgorithm={visualizer.setAlgorithm}
              isDirected={visualizer.isDirected}
              onToggleDirected={visualizer.setIsDirected}
              nodes={visualizer.nodes}
              startNodeId={visualizer.startNodeId}
              onSelectStartNode={visualizer.setStartNodeId}
              isPlaying={visualizer.isPlaying}
              onTogglePlayback={visualizer.togglePlayback}
              currentStep={visualizer.currentStepIndex}
              stepCount={visualizer.steps.length}
              onPreviousStep={visualizer.goToPreviousStep}
              onNextStep={visualizer.goToNextStep}
              onReset={visualizer.reset}
              speed={visualizer.speed}
              onSelectSpeed={visualizer.setSpeed}
            />
          </div>

          {/* Live Step Explanation & State Tracker */}
          <div className="mt-6">
            <GraphStepExplanation
              currentFrame={visualizer.currentFrame}
              currentStep={visualizer.currentStepIndex}
              stepCount={visualizer.steps.length}
              algorithm={visualizer.algorithm}
            />
          </div>

          {/* Representations: Adjacency List & Matrix */}
          <div className="mt-6">
            <GraphRepresentations
              adjacencyList={visualizer.adjacencyList}
              adjacencyMatrix={visualizer.adjacencyMatrix}
              currentFrame={visualizer.currentFrame}
            />
          </div>

          {/* Comprehensive Theory & Educational Content */}
          <div className="mt-8">
            <GraphTheory />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
