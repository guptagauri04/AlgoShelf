import { Link } from "react-router-dom";
import { ArrowLeft, Clock3, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import useTreeTraversal from "../hooks/useTreeTraversal";
import BinaryTreeVisualizer from "../components/BinaryTreeVisualizer";
import TraversalControls from "../components/TraversalControls";
import TraversalSequenceTape from "../components/TraversalSequenceTape";
import TraversalComparisonCard from "../components/TraversalComparisonCard";
import CallStackVisualizer from "../components/CallStackVisualizer";
import TreeStepExplanation from "../components/TreeStepExplanation";
import TreeCodeBlock from "../components/TreeCodeBlock";
import TreeTheorySection from "../components/TreeTheorySection";

export default function BinaryTreeTraversal() {
  const {
    presetKey,
    changePreset,
    traversalType,
    changeTraversalType,
    speed,
    setSpeed,
    playing,
    togglePlayPause,
    nextStep,
    prevStep,
    reset,
    currentStepIndex,
    totalSteps,
    isFinished,
    currentFrame,
    layout,
    comparisonSequences,
  } = useTreeTraversal("balanced", "inorder");

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Hero */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/trees"
              className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
            >
              <ArrowLeft size={16} />
              Back to Trees Shelf
            </Link>

            <Link
              to="/"
              onClick={() => sessionStorage.setItem("scrollToBookshelf", "true")}
              className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
            >
              Return to Bookshelf
            </Link>
          </div>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  BOOK IV · CHAPTER I
                </p>
              </div>

              <h1 className="mt-6 font-display text-5xl leading-[0.95] text-[#1F1B18] sm:text-6xl md:text-7xl">
                Binary Tree Traversal
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                Inorder · Preorder · Postorder
              </p>

              <p className="mt-6 max-w-2xl text-base leading-7 text-[#5F5952] md:text-lg">
                Explore the fundamental recursive pathways through a binary
                tree. Observe how visiting the root before, between, or after its
                subtrees transforms the resulting sequence and unlocks powerful
                computational paradigms.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-xs font-medium text-[#7A7068]">
                <div className="flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/60 px-4 py-2">
                  <Clock3 size={15} className="text-[#A1764E]" />
                  <span>Time Complexity: O(n)</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/60 px-4 py-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  <span>Difficulty: Beginner</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/60 px-4 py-2">
                  <Sparkles size={15} className="text-[#A1764E]" />
                  <span>Interactive Visualization</span>
                </div>
              </div>
            </div>

            {/* Editorial Quote & Quick Concept */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white/80 p-8 shadow-xs">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                The Traversal Axiom
              </span>
              <p className="font-editorial mt-4 text-xl italic leading-relaxed text-[#3D352E]">
                “A binary tree is not just a data structure; it is a recursive
                invitation. By shifting where we honor the root, a single tree
                tells three entirely different stories.”
              </p>
              <div className="mt-6 space-y-2 text-xs text-[#6B645D]">
                <p>
                  <strong>Preorder (N-L-R):</strong> Root is prioritized first.
                </p>
                <p>
                  <strong>Inorder (L-N-R):</strong> Root is symmetric in the
                  middle.
                </p>
                <p>
                  <strong>Postorder (L-R-N):</strong> Root is evaluated last.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8 space-y-10">
        {/* Visualizer Canvas & Controls Layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <BinaryTreeVisualizer
            layout={layout}
            currentFrame={currentFrame}
            traversalType={traversalType}
          />

          <TraversalControls
            traversalType={traversalType}
            onTraversalChange={changeTraversalType}
            presetKey={presetKey}
            onPresetChange={changePreset}
            playing={playing}
            onPlayPause={togglePlayPause}
            onNext={nextStep}
            onPrev={prevStep}
            onReset={reset}
            currentStep={currentStepIndex}
            totalSteps={totalSteps}
            speed={speed}
            onSpeedChange={setSpeed}
            isFinished={isFinished}
          />
        </div>

        {/* Live Step-by-Step Sequence Ribbon */}
        <TraversalSequenceTape
          visitedValues={currentFrame?.visitedValues || []}
          totalNodes={layout.nodes.length}
          justVisitedId={currentFrame?.justVisitedId}
          traversalType={traversalType}
          isFinished={isFinished}
        />

        {/* Step Explanation & Call Stack */}
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <TreeStepExplanation
              message={currentFrame?.message}
              currentStep={currentStepIndex}
              totalSteps={totalSteps}
              traversalType={traversalType}
            />

            <CallStackVisualizer
              callStack={currentFrame?.callStack || []}
            />
          </div>

          <div>
            <TreeCodeBlock
              traversalType={traversalType}
              activeLine={currentFrame?.activeLine || 1}
            />
          </div>
        </div>

        {/* Comparison Section (Inorder vs Preorder vs Postorder) */}
        <TraversalComparisonCard
          comparisonSequences={comparisonSequences}
          activeTraversal={traversalType}
          onSelectTraversal={changeTraversalType}
        />

        {/* Theory & Complexity Deep Dive */}
        <TreeTheorySection />
      </main>

      <Footer />
    </div>
  );
}
