import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SearchVisualizer from "../components/SearchVisualizer";
import SearchControls from "../components/SearchControls";
import StepExplanation from "../components/StepExplanation";
import CodeBlock from "../components/CodeBlock";
import ComplexityCard from "../components/ComplexityCard";
import TheorySection from "../components/TheorySection";
import { binaryContent } from "../data/content/binary";
import { binarySearchSteps, generateSortedArray, parseTargetInput } from "../utils/searchHelpers";
import useSearchAnimation from "../hooks/useSearchAnimation";

export default function BinarySearch() {
  const [array, setArray] = useState(() => generateSortedArray(9));
  const [targetInput, setTargetInput] = useState(() => String(array[Math.floor(array.length / 2)]));
  const [error, setError] = useState("");
  const [steps, setSteps] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const animation = useSearchAnimation(steps, 750);

  const handleShuffle = () => {
    const newArr = generateSortedArray(9);
    setArray(newArr);
    setTargetInput(String(newArr[Math.floor(Math.random() * newArr.length)]));
    setError("");
    animation.reset();
    setIsSearching(false);
    setSteps([]);
  };

  const handlePickPresent = () => {
    if (array.length === 0) return;
    const randomExisting = array[Math.floor(Math.random() * array.length)];
    setTargetInput(String(randomExisting));
    setError("");
    if (isSearching) {
      animation.reset();
      setIsSearching(false);
      setSteps([]);
    }
  };

  const handlePickAbsent = () => {
    let candidate = 100;
    while (array.includes(candidate)) {
      candidate++;
    }
    setTargetInput(String(candidate));
    setError("");
    if (isSearching) {
      animation.reset();
      setIsSearching(false);
      setSteps([]);
    }
  };

  const validateTarget = () => {
    const { value, error: err } = parseTargetInput(targetInput);
    if (err) {
      setError(err);
      return null;
    }
    setError("");
    return value;
  };

  const startSearch = () => {
    const targetVal = validateTarget();
    if (targetVal === null) return;

    const generatedSteps = binarySearchSteps(array, targetVal);
    setSteps(generatedSteps);
    setIsSearching(true);
    animation.reset();
    animation.play();
  };

  const handleResetSearch = () => {
    animation.reset();
    setIsSearching(false);
    setSteps([]);
  };

  const currentFrame = animation.currentFrame || {
    array,
    lowIndex: 0,
    highIndex: array.length - 1,
    midIndex: -1,
    currentIndex: -1,
    eliminatedIndices: [],
    foundIndex: -1,
    target: Number(targetInput) || null,
    status: "idle",
    comparisons: 0,
    currentLine: 1,
    message: {
      title: "Ready to Search",
      description: "Set a target value and click Start Search to watch Binary Search divide and conquer.",
      insight: "Binary Search inspects the midpoint of a sorted array to discard half of the search space at every step.",
    },
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Hero */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/searching"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Searching Shelf
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  BOOK III · {binaryContent.chapter}
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl md:text-8xl">
                {binaryContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {binaryContent.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 max-w-xl border-l-2 border-[#DDD2C5] pl-6 text-[#5F5952]">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                  Editorial Note
                </p>
                <p className="mt-2 text-base leading-7 italic">
                  “Order is the mother of speed. By sorting our world first, we earn the power to eliminate half of it in a single question.”
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 6 min read
                </span>
                <span className="rounded-full bg-emerald-100 px-3.5 py-1.5 font-medium text-emerald-800">
                  Beginner / Intermediate
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  Requires Sorted Input
                </span>
              </div>
            </div>

            {/* Quick Overview Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                Quick Intuition
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                Imagine opening a dictionary in the middle. If the target word is alphabetically earlier, you discard the entire second half and repeat on the front half.
              </p>

              <div className="mt-6 rounded-2xl border border-[#EEE5DB] bg-white p-4">
                <p className="text-xs uppercase tracking-wider text-[#8C837B]">
                  Complexity Highlights
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 text-center font-mono">
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Best:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(1)</strong>
                  </div>
                  <div className="rounded-xl bg-[#FAF8F5] p-2">
                    <span className="text-xs text-[#8C837B]">Worst:</span>{" "}
                    <strong className="text-sm text-[#1F1B18]">O(log n)</strong>
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
        {/* Visualizer Display */}
        <SearchVisualizer
          array={currentFrame.array}
          currentIndex={currentFrame.currentIndex}
          checkedIndices={[]}
          lowIndex={currentFrame.lowIndex}
          highIndex={currentFrame.highIndex}
          midIndex={currentFrame.midIndex}
          eliminatedIndices={currentFrame.eliminatedIndices}
          foundIndex={currentFrame.foundIndex}
          target={currentFrame.target}
          status={currentFrame.status}
          isBinary={true}
        />

        {/* Controls */}
        <SearchControls
          targetInput={targetInput}
          onTargetChange={setTargetInput}
          onStartSearch={startSearch}
          onPlayPause={animation.togglePlayPause}
          playing={animation.playing}
          onNext={animation.nextStep}
          onPrev={animation.prevStep}
          onReset={handleResetSearch}
          onShuffle={handleShuffle}
          onPickPresent={handlePickPresent}
          onPickAbsent={handlePickAbsent}
          currentStep={animation.currentStep}
          totalSteps={animation.totalSteps}
          speed={animation.speed}
          onSpeedChange={animation.setSpeed}
          isSearching={isSearching}
          error={error}
        />

        {/* Step Explanation & Pseudocode Grid */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <StepExplanation
            message={currentFrame.message}
            currentStep={animation.currentStep}
            totalSteps={animation.totalSteps}
            comparisons={currentFrame.comparisons}
          />

          <CodeBlock
            pseudocode={binaryContent.pseudocode}
            currentLine={currentFrame.currentLine}
          />
        </div>

        {/* Complexity Analysis Cards */}
        <section className="pt-8 border-t border-[#ECE3D8]">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
            Performance Analysis
          </p>
          <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
            Complexity Breakdown
          </h2>
          <p className="mt-2 max-w-2xl text-base text-[#6B645D]">
            Understand why Binary Search scales to massive datasets with logarithmic efficiency.
          </p>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ComplexityCard
              title="Best Case"
              value={binaryContent.complexity.best}
              subtitle="Target is located directly at the initial midpoint"
            />
            <ComplexityCard
              title="Average Case"
              value={binaryContent.complexity.average}
              subtitle="Halves the remaining space on each comparison"
            />
            <ComplexityCard
              title="Worst Case"
              value={binaryContent.complexity.worst}
              subtitle="Target is in the final single-element interval or absent"
            />
            <ComplexityCard
              title="Auxiliary Space"
              value={binaryContent.complexity.space}
              subtitle="Requires only three pointer variables (in-place)"
            />
          </div>
        </section>

        {/* Theory & Discussion */}
        <section className="pt-6">
          <TheorySection content={binaryContent} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
