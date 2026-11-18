import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import BSTVisualizer from "../components/BSTVisualizer";
import BSTControls from "../components/BSTControls";
import BSTStepExplanation from "../components/BSTStepExplanation";
import BSTTheory from "../components/BSTTheory";
import useBSTVisualizer from "../hooks/useBSTVisualizer";

export default function BSTOperations() {
  const visualizer = useBSTVisualizer();

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-20 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl">
          {/* Back Navigation */}
          <Link
            to="/learn/trees"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Back to Trees Overview
          </Link>

          {/* Lesson Header */}
          <header className="mt-10 border-b border-[#E8DDD1] pb-10 md:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6F5D86]">
              Book IV · Chapter I · Interactive Lesson
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
              Binary Search Tree Operations
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              Observe how a Binary Search Tree maintains its strict ordering property through
              animated insertions, targeted searches, and structural deletions across all three child cases.
            </p>
          </header>

          {/* Interactive Workbench: Controls & Visualizer */}
          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <BSTVisualizer
              nodes={visualizer.nodes}
              edges={visualizer.edges}
              highlightedNodeId={visualizer.highlightedNodeId}
              status={visualizer.status}
            />

            <div className="flex flex-col gap-6">
              <BSTControls
                value={visualizer.inputValue}
                onValueChange={visualizer.setInputValue}
                onInsert={() => visualizer.startOperation("insert")}
                onSearch={() => visualizer.startOperation("search")}
                onDelete={() => visualizer.startOperation("delete")}
                error={visualizer.error}
                currentStep={visualizer.currentStep}
                stepCount={visualizer.stepCount}
                isPlaying={visualizer.isPlaying}
                onPlayPause={visualizer.togglePlayPause}
                onNext={visualizer.goToNextStep}
                onPrevious={visualizer.goToPrevStep}
                onReset={visualizer.resetTree}
                onClear={visualizer.clearTree}
                speed={visualizer.speed}
                onSpeedChange={visualizer.setSpeed}
                activeOperation={visualizer.activeOperation}
              />

              <BSTStepExplanation
                frame={visualizer.currentFrame}
                operation={visualizer.activeOperation}
              />
            </div>
          </div>

          {/* In-Depth Theory & Complexities */}
          <BSTTheory />
        </div>
      </main>

      <Footer />
    </>
  );
}
