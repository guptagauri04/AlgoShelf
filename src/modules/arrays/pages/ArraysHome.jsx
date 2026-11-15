import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import ArrayEditor from "../components/ArrayEditor";
import ArrayOperationControls from "../components/ArrayOperationControls";
import ArrayStepExplanation from "../components/ArrayStepExplanation";
import ArrayVisualization from "../components/ArrayVisualization";
import useArrayVisualizer from "../hooks/useArrayVisualizer";

export default function ArraysHome() {
  const visualizer = useArrayVisualizer();
  const frame = visualizer.currentFrame;

  return (
    <>
      <main className="min-h-screen bg-[#F7F5F2] px-4 pb-20 pt-10 text-[#1F1B18] sm:px-6 md:pt-14">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/"
            onClick={() => sessionStorage.setItem("scrollToBookshelf", "true")}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2"
          >
            <ArrowLeft size={16} />
            Back to bookshelf
          </Link>

          <header className="mt-10 border-b border-[#E8DDD1] pb-10 md:mt-14">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
              Book I · Interactive lesson
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#1F1B18] sm:text-6xl">
              Array Insertion &amp; Deletion
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
              See how array elements make room for an insertion or close a gap
              after deletion. Move through each step or play the animation.
            </p>
          </header>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <ArrayEditor
              value={visualizer.arrayInput}
              onChange={visualizer.setArrayInput}
              onApply={visualizer.applyArrayInput}
              onSample={visualizer.loadSampleArray}
              error={visualizer.arrayError}
              disabled={visualizer.isLocked}
            />
            <ArrayOperationControls
              index={visualizer.indexInput}
              onIndexChange={visualizer.setIndexInput}
              value={visualizer.valueInput}
              onValueChange={visualizer.setValueInput}
              onInsert={() => visualizer.startOperation("insert")}
              onDelete={() => visualizer.startOperation("delete")}
              error={visualizer.operationError}
              operation={visualizer.operation}
              currentStep={visualizer.currentStep}
              stepCount={visualizer.steps.length}
              playing={visualizer.playing}
              onPrevious={visualizer.goToPreviousStep}
              onNext={visualizer.goToNextStep}
              onPlayPause={visualizer.togglePlayback}
              onReset={visualizer.resetOperation}
            />
          </div>

          <div className="mt-6">
            <ArrayVisualization
              items={visualizer.items}
              highlightedId={frame?.highlightedId}
              operationType={visualizer.operation?.type}
              operationComplete={frame?.isFinal}
            />
          </div>

          {visualizer.operation && (
            <div className="mt-6">
              <ArrayStepExplanation
                frame={frame}
                currentStep={visualizer.currentStep}
                stepCount={visualizer.steps.length}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
