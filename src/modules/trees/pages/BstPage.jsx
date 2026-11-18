import { ArrowLeft, BookOpen, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import useBstVisualizer from "../hooks/useBstVisualizer";
import BstTreeCanvas from "../components/BstTreeCanvas";
import BstControls from "../components/BstControls";
import BstStepCard from "../components/BstStepCard";

export default function BstPage() {
  const visualizer = useBstVisualizer();
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
                <GitBranch size={16} />
              </span>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                Book V · Hierarchical Structures
              </p>
            </div>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#1F1B18] sm:text-6xl">
              Binary Search Tree
              <br />
              <span className="text-[#8B5A2B]">Insert, Search &amp; Delete</span>
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              A Binary Search Tree enforces a fundamental spatial order: all values in a node’s left subtree are strictly smaller, and all values in its right subtree are strictly larger. Observe how this invariant empowers logarithmic-time retrieval.
            </p>
          </header>

          {/* 2D Canvas */}
          <BstTreeCanvas
            layout={visualizer.layout}
            highlightedId={frame.highlightedId}
            foundId={frame.foundId}
            comparison={frame.comparison}
          />

          {/* Controls */}
          <BstControls
            activeAction={visualizer.activeAction}
            setActiveAction={visualizer.setActiveAction}
            inputValue={visualizer.inputValue}
            setInputValue={visualizer.setInputValue}
            error={visualizer.error}
            isPlaying={visualizer.isPlaying}
            speed={visualizer.speed}
            setSpeed={visualizer.setSpeed}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
            handleExecute={visualizer.handleExecute}
            stepForward={visualizer.stepForward}
            stepBackward={visualizer.stepBackward}
            togglePlay={visualizer.togglePlay}
            handleResetSample={visualizer.handleResetSample}
            handleClear={visualizer.handleClear}
          />

          {/* Step Details & Complexity */}
          <BstStepCard
            frame={frame}
            currentStepIndex={visualizer.currentStepIndex}
            totalSteps={visualizer.steps.length}
          />

          {/* Theory Reference Card */}
          <section className="rounded-3xl border border-[#E8DDD1] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
              <BookOpen size={16} />
              <span>BST Fundamental Invariants</span>
            </div>

            <h3 className="mt-3 font-display text-2xl font-bold text-[#1F1B18]">
              Core Principles &amp; Complexity
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-5">
                <h4 className="font-display text-lg font-bold text-[#1F1B18]">1. The BST Invariant</h4>
                <p className="mt-2 text-xs leading-relaxed text-[#6B645D]">
                  For any given node X, every value in its left subtree satisfies <code>L &lt; X</code>, and every value in its right subtree satisfies <code>R &gt; X</code>.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-5">
                <h4 className="font-display text-lg font-bold text-[#1F1B18]">2. Inorder Sort Property</h4>
                <p className="mt-2 text-xs leading-relaxed text-[#6B645D]">
                  Visiting nodes using an Inorder Traversal (Left ➔ Root ➔ Right) retrieves all elements in strictly sorted ascending order.
                </p>
              </div>

              <div className="rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-5">
                <h4 className="font-display text-lg font-bold text-[#1F1B18]">3. Balance &amp; Skew</h4>
                <p className="mt-2 text-xs leading-relaxed text-[#6B645D]">
                  On balanced trees, height is <code>O(log n)</code>. When sorted inputs are inserted without balancing, the tree degenerates into a linked list with <code>O(n)</code> height.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
