import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  FastForward,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import TreeVisualizer from "../components/TreeVisualizer";
import { treeContent } from "../data/treeContent";
import {
  createInitialTree,
  generateTraversalSteps,
  countNodes,
} from "../utils/bstEngine";

export default function TreeTraversalsPage() {
  const [root] = useState(() => createInitialTree());
  const [selectedType, setSelectedType] = useState("inorder");
  const [speedMs, setSpeedMs] = useState(700);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const playTimerRef = useRef(null);

  const currentTypeInfo =
    treeContent.traversals.types.find((t) => t.id === selectedType) ||
    treeContent.traversals.types[0];

  const steps = useMemo(
    () => generateTraversalSteps(root, selectedType),
    [root, selectedType]
  );

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
  }, []);

  const handleSelectType = (typeId) => {
    stopPlayback();
    setSelectedType(typeId);
    setCurrentStepIndex(-1);
  };

  // Handle Play/Pause animation timer
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        if (currentStepIndex < steps.length - 1) {
          setCurrentStepIndex((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, speedMs);
    }

    return () => {
      if (playTimerRef.current) {
        clearTimeout(playTimerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      if (currentStepIndex >= steps.length - 1) {
        setCurrentStepIndex(0);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
      setIsPlaying(true);
    }
  };

  const handleStepForward = () => {
    stopPlayback();
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    stopPlayback();
    setCurrentStepIndex(-1);
  };

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : null;

  const activeNodeId = currentStep ? currentStep.activeId : null;
  const visitedIds = currentStep ? currentStep.visitedIds : [];
  const accumulatedList = currentStep ? currentStep.accumulator : [];
  const isFinished = currentStepIndex === steps.length - 1 && steps.length > 0;

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-serif text-[#1F1B18]">
      {/* Navigation Header */}
      <header className="border-b border-[#E8DDD1] bg-[#FCFBF8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/learn/trees"
            className="group flex items-center gap-2 text-sm font-sans font-medium text-[#6B5B4D] transition-colors hover:text-[#1F1B18]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Trees &amp; BST</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A1764E]">
            <BookOpen size={14} />
            <span>Book IV &bull; Chapter II</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Title Section */}
        <section className="mb-10 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Binary Tree Traversals
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#1F1B18] md:text-5xl">
            Inorder, Preorder &amp; Postorder
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-base text-[#6B5B4D]">
            Systematically visit every single node in the tree hierarchy with
            distinct recursion orders, yielding different sequences for
            computation and search.
          </p>
        </section>

        {/* Traversal Selector Tabs */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {treeContent.traversals.types.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleSelectType(type.id)}
                className={`rounded-2xl border px-5 py-3 font-sans text-sm font-medium transition-all ${
                  isSelected
                    ? "border-[#A1764E] bg-white text-[#1F1B18] shadow-sm ring-2 ring-[#A1764E]/20"
                    : "border-[#E8DDD1] bg-[#FCFBF8] text-[#6B5B4D] hover:border-[#D8C5B0] hover:bg-white"
                }`}
              >
                <div className="font-semibold">{type.name}</div>
                <div className="mt-0.5 font-mono text-xs text-[#A1764E]">
                  {type.rule}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Canvas & Controls (2 Columns) */}
          <div className="space-y-6 lg:col-span-2">
            {/* Visualizer Canvas */}
            <TreeVisualizer
              root={root}
              activeNodeId={activeNodeId}
              visitedIds={visitedIds}
              targetNodeId={null}
              operationType="traversal"
              message={
                currentStep
                  ? {
                      type: isFinished ? "success" : "info",
                      text: currentStep.description,
                    }
                  : null
              }
            />

            {/* Traversal Accumulator Array */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl text-[#1F1B18]">
                    Traversal Output Array
                  </h3>
                  <p className="font-sans text-xs text-[#8C837B]">
                    Values yielded in sequence by the{" "}
                    <span className="font-semibold text-[#A1764E]">
                      {currentTypeInfo.name}
                    </span>{" "}
                    routine.
                  </p>
                </div>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-1 font-mono text-xs text-[#6B5B4D]">
                  {accumulatedList.length} / {countNodes(root)} Visited
                </span>
              </div>

              <div className="min-h-[58px] rounded-2xl border-2 border-dashed border-[#E8DDD1] bg-[#FCFBF8] p-3">
                {accumulatedList.length > 0 ? (
                  <div className="flex flex-wrap items-center gap-2">
                    {accumulatedList.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs transition-all ${
                          item.id === activeNodeId
                            ? "border-[#D39B2A] bg-[#FEF9EE] text-[#8B5A2B] ring-2 ring-[#D39B2A]/30"
                            : "border-[#A1764E]/30 bg-white text-[#1F1B18] shadow-sm"
                        }`}
                      >
                        <span className="text-[10px] text-[#A1764E]">
                          #{idx + 1}:
                        </span>
                        <span className="font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-10 items-center justify-center font-sans text-xs italic text-[#8C837B]">
                    Click &ldquo;Play&rdquo; or &ldquo;Step Forward&rdquo; to
                    begin collecting visited nodes.
                  </div>
                )}
              </div>
            </div>

            {/* Animation Control Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handlePlayToggle}
                  className="flex items-center gap-2 rounded-2xl bg-[#A1764E] px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8B5A2B]"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isPlaying ? "Pause" : "Play Traversal"}</span>
                </button>

                <button
                  onClick={handleStepForward}
                  disabled={currentStepIndex >= steps.length - 1}
                  className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-sans text-sm font-medium text-[#1F1B18] transition-colors hover:bg-white disabled:opacity-40"
                >
                  <FastForward size={16} />
                  <span>Step Forward</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-sans text-sm font-medium text-[#6B5B4D] transition-colors hover:bg-white"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </button>
              </div>

              {/* Speed Slider */}
              <div className="flex items-center gap-3 font-sans text-xs text-[#6B5B4D]">
                <Clock3 size={15} className="text-[#A1764E]" />
                <span>Pace:</span>
                <input
                  type="range"
                  min="200"
                  max="1500"
                  step="100"
                  value={speedMs}
                  onChange={(e) => setSpeedMs(Number(e.target.value))}
                  className="h-1.5 w-24 cursor-pointer accent-[#A1764E]"
                />
                <span className="font-mono">{speedMs}ms</span>
              </div>
            </div>
          </div>

          {/* Right Theory & Pseudocode Column */}
          <div className="space-y-6">
            {/* Traversal Summary Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                <Sparkles size={16} />
                <span>Traversal Mechanics</span>
              </div>

              <h3 className="mt-2 font-display text-2xl text-[#1F1B18]">
                {currentTypeInfo.name}
              </h3>

              <div className="mt-3 rounded-2xl border border-[#A1764E]/20 bg-[#FAF7F2] p-3.5 text-center">
                <span className="font-mono text-sm font-bold text-[#A1764E]">
                  {currentTypeInfo.rule}
                </span>
              </div>

              <p className="mt-4 font-serif text-sm leading-relaxed text-[#6B5B4D]">
                {currentTypeInfo.desc}
              </p>

              <div className="mt-5 border-t border-[#EEE5DB] pt-4">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
                  Complexity Profile
                </h4>
                <div className="mt-2 grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-2.5 text-center">
                    <span className="block text-[10px] text-[#8C837B]">
                      Time
                    </span>
                    <span className="font-bold text-[#3D5A37]">O(n)</span>
                  </div>
                  <div className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-2.5 text-center">
                    <span className="block text-[10px] text-[#8C837B]">
                      Stack Space
                    </span>
                    <span className="font-bold text-[#8B5A2B]">O(h)</span>
                  </div>
                </div>
                <p className="mt-2 font-sans text-[11px] text-[#8C837B]">
                  * Visits all n nodes once; recursion stack bounded by height h
                  (log n balanced, n worst-case).
                </p>
              </div>
            </div>

            {/* Pseudocode Block */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                  <Code2 size={16} />
                  <span>Recursive Routine</span>
                </div>
                <span className="font-mono text-[10px] text-[#8C837B]">
                  JavaScript
                </span>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-[#E8DDD1] bg-[#1F1B18] p-4 font-mono text-xs leading-relaxed text-[#F7F5F2]">
                <code>{currentTypeInfo.pseudocode}</code>
              </pre>
            </div>

            {/* Practical Applications */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FAF7F2] p-6">
              <h4 className="font-display text-lg text-[#1F1B18]">
                Key Takeaways
              </h4>
              <ul className="mt-3 space-y-2.5 font-serif text-xs text-[#6B5B4D]">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>Inorder on BST:</strong> Always produces a strictly
                    sorted ascending list of keys.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>Preorder:</strong> Preserves hierarchy and root
                    ordering, making it the choice for serialization and cloning.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>Postorder:</strong> Ensures leaves are safely
                    processed before parent destruction or bottom-up metrics.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
