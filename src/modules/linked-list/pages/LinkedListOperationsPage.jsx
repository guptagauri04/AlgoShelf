import { useState, useRef, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  FastForward,
  Play,
  Pause,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import SinglyLinkedListVisualizer from "../components/SinglyLinkedListVisualizer";
import { linkedListContent } from "../data/linkedListContent";
import {
  createInitialList,
  insertBeginning,
  insertEnd,
  insertAtPosition,
  deleteBeginning,
  deleteEnd,
  deleteAtPosition,
} from "../utils/singlyLinkedListEngine";

export default function LinkedListOperationsPage() {
  const [list, setList] = useState(() => createInitialList());

  // Input states
  const [insertVal, setInsertVal] = useState("");
  const [insertPos, setInsertPos] = useState("0");
  const [deletePos, setDeletePos] = useState("0");

  // Animation states
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(700);
  const playTimerRef = useRef(null);

  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("insert"); // "insert" | "delete"
  const [selectedOpName, setSelectedOpName] = useState(
    "Insert at Beginning (Head)"
  );

  const stopPlayback = useCallback(() => {
    setIsPlaying(false);
    if (playTimerRef.current) {
      clearTimeout(playTimerRef.current);
      playTimerRef.current = null;
    }
  }, []);

  // Timer playback
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setTimeout(() => {
        playTimerRef.current = null;
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
        playTimerRef.current = null;
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speedMs]);

  const runOperation = (opResult, opName) => {
    stopPlayback();
    if (!opResult.success) {
      setMessage({ type: "error", text: opResult.message });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }

    setSelectedOpName(opName);
    setList(opResult.list);
    setSteps(opResult.steps);
    setCurrentStepIndex(0);
    setMessage({ type: "info", text: opResult.message });
  };

  const handleInsertHead = () => {
    const val = Number(insertVal);
    if (!insertVal.trim() || !Number.isFinite(val)) {
      setMessage({
        type: "error",
        text: "Please enter a valid numeric value to insert.",
      });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }
    const res = insertBeginning(list, val);
    runOperation(res, "Insert at Beginning (Head)");
    if (res.success) {
      setInsertVal("");
    }
  };

  const handleInsertTail = () => {
    const val = Number(insertVal);
    if (!insertVal.trim() || !Number.isFinite(val)) {
      setMessage({
        type: "error",
        text: "Please enter a valid numeric value to insert.",
      });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }
    const res = insertEnd(list, val);
    runOperation(res, "Insert at End (Tail)");
    if (res.success) {
      setInsertVal("");
    }
  };

  const handleInsertAtPosition = () => {
    const val = Number(insertVal);
    if (!insertVal.trim() || !Number.isFinite(val)) {
      setMessage({
        type: "error",
        text: "Please enter a valid numeric value to insert.",
      });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }
    const pos = Number(insertPos);
    if (!insertPos.trim() || !Number.isInteger(pos) || pos < 0 || pos > list.length) {
      setMessage({
        type: "error",
        text: `Position must be an integer between 0 and ${list.length}.`,
      });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }
    const res = insertAtPosition(list, val, pos);
    runOperation(res, "Insert at Position (k)");
    if (res.success) {
      setInsertVal("");
      setInsertPos("");
    }
  };

  const handleDeleteHead = () => {
    const res = deleteBeginning(list);
    runOperation(res, "Delete from Beginning (Head)");
  };

  const handleDeleteTail = () => {
    const res = deleteEnd(list);
    runOperation(res, "Delete from End (Tail)");
  };

  const handleDeleteAtPosition = () => {
    const pos = Number(deletePos);
    if (
      !deletePos.trim() ||
      !Number.isInteger(pos) ||
      pos < 0 ||
      pos >= list.length
    ) {
      setMessage({
        type: "error",
        text: `Position must be an integer between 0 and ${Math.max(
          0,
          list.length - 1
        )}.`,
      });
      setSteps([]);
      setCurrentStepIndex(-1);
      return;
    }
    const res = deleteAtPosition(list, pos);
    runOperation(res, "Delete from Position (k)");
    if (res.success) {
      setDeletePos("");
    }
  };

  const handleResetList = () => {
    stopPlayback();
    const fresh = createInitialList();
    setList(fresh);
    setSteps([]);
    setCurrentStepIndex(-1);
    setMessage({
      type: "info",
      text: "Reset linked list to default values [10, 25, 40, 65].",
    });
  };

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

  const currentStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length
      ? steps[currentStepIndex]
      : null;

  const activeDisplayList = currentStep ? currentStep.listSnapshot : list;
  const highlightIndex = currentStep ? currentStep.highlightIndex : -1;
  const relinkIndex = currentStep ? currentStep.relinkIndex : -1;
  const newNode = currentStep ? currentStep.newNode : null;
  const deletedNodeId = currentStep ? currentStep.deletedNodeId : null;

  const currentOpInfo =
    linkedListContent.operations.find((op) => op.name === selectedOpName) ||
    linkedListContent.operations[0];

  return (
    <div className="min-h-screen bg-[#F7F5F2] font-serif text-[#1F1B18]">
      {/* Header */}
      <header className="border-b border-[#E8DDD1] bg-[#FCFBF8]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            to="/learn/linked-lists"
            className="group flex items-center gap-2 font-sans text-sm font-medium text-[#6B5B4D] transition-colors hover:text-[#1F1B18]"
          >
            <ArrowLeft
              size={18}
              className="transition-transform group-hover:-translate-x-1"
            />
            <span>Back to Linked Lists</span>
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A1764E]">
            <BookOpen size={14} />
            <span>Book II &bull; Chapter I</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Title */}
        <section className="mb-10 text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Pointer Manipulation Laboratory
          </p>
          <h1 className="mt-2 font-display text-4xl text-[#1F1B18] md:text-5xl">
            Singly Linked List Operations
          </h1>
          <p className="mx-auto mt-3 max-w-2xl font-serif text-base text-[#6B5B4D]">
            Perform insertions and deletions at the beginning, end, or any
            arbitrary index, visualizing how node addresses and next pointers
            are rewired.
          </p>
        </section>

        {/* 2-Column Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Visualizer & Control Panels (2 Columns) */}
          <div className="space-y-6 lg:col-span-2">
            <SinglyLinkedListVisualizer
              list={activeDisplayList}
              highlightIndex={highlightIndex}
              relinkIndex={relinkIndex}
              newNode={newNode}
              deletedNodeId={deletedNodeId}
              message={
                currentStep
                  ? {
                      type: "info",
                      text: currentStep.description,
                    }
                  : message
              }
            />

            {/* Animation Controls (when steps are present) */}
            {steps.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handlePlayToggle}
                    className="flex items-center gap-2 rounded-2xl bg-[#A1764E] px-5 py-2.5 font-sans text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#8B5A2B]"
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    <span>{isPlaying ? "Pause" : "Play Animation"}</span>
                  </button>

                  <button
                    onClick={handleStepForward}
                    disabled={currentStepIndex >= steps.length - 1}
                    className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-sans text-sm font-medium text-[#1F1B18] transition-colors hover:bg-white disabled:opacity-40"
                  >
                    <FastForward size={16} />
                    <span>Step Forward</span>
                  </button>

                  <span className="font-mono text-xs text-[#8C837B]">
                    Step {currentStepIndex + 1} / {steps.length}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-sans text-xs text-[#6B5B4D]">
                  <Clock3 size={15} className="text-[#A1764E]" />
                  <span>Pace:</span>
                  <input
                    type="range"
                    min="300"
                    max="1500"
                    step="100"
                    value={speedMs}
                    onChange={(e) => setSpeedMs(Number(e.target.value))}
                    className="h-1.5 w-24 cursor-pointer accent-[#A1764E]"
                  />
                  <span className="font-mono">{speedMs}ms</span>
                </div>
              </div>
            )}

            {/* Operations Control Box */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              {/* Tab Selector */}
              <div className="mb-6 flex items-center justify-between border-b border-[#EEE5DB] pb-4">
                <div className="flex rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5">
                  <button
                    onClick={() => setActiveTab("insert")}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all ${
                      activeTab === "insert"
                        ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                        : "text-[#6B5B4D]"
                    }`}
                  >
                    <Plus size={14} className="text-[#3D5A37]" />
                    <span>Insertion Operations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("delete")}
                    className={`flex items-center gap-1.5 rounded-xl px-4 py-2 font-sans text-xs font-semibold transition-all ${
                      activeTab === "delete"
                        ? "bg-white text-[#1F1B18] shadow-sm ring-1 ring-[#A1764E]/30"
                        : "text-[#6B5B4D]"
                    }`}
                  >
                    <Trash2 size={14} className="text-red-500" />
                    <span>Deletion Operations</span>
                  </button>
                </div>

                <button
                  onClick={handleResetList}
                  className="flex items-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-2 font-sans text-xs font-medium text-[#6B5B4D] transition-colors hover:bg-white"
                >
                  <RotateCcw size={14} />
                  <span>Reset List</span>
                </button>
              </div>

              {/* Insertion Tab */}
              {activeTab === "insert" ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="font-sans text-xs font-semibold text-[#8C837B]">
                      Node Value:
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 50"
                      value={insertVal}
                      onChange={(e) => setInsertVal(e.target.value)}
                      className="w-28 rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-2 font-mono text-sm focus:border-[#A1764E] focus:outline-none"
                    />

                    <button
                      onClick={handleInsertHead}
                      className="rounded-xl bg-[#A1764E] px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm hover:bg-[#8B5A2B]"
                    >
                      Insert at Head (O(1))
                    </button>

                    <button
                      onClick={handleInsertTail}
                      className="rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2 font-sans text-xs font-semibold text-[#1F1B18] hover:bg-white"
                    >
                      Insert at Tail (O(n))
                    </button>
                  </div>

                  {/* Position Insert */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-[#F0EBE4] pt-4">
                    <label className="font-sans text-xs font-semibold text-[#8C837B]">
                      Insert at Index:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={list.length}
                      value={insertPos}
                      onChange={(e) => setInsertPos(e.target.value)}
                      className="w-20 rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-2 font-mono text-sm focus:border-[#A1764E] focus:outline-none"
                    />
                    <button
                      onClick={handleInsertAtPosition}
                      className="rounded-xl border border-[#A1764E] bg-white px-4 py-2 font-sans text-xs font-semibold text-[#A1764E] hover:bg-[#FAF7F2]"
                    >
                      Insert at Index {insertPos} (O(n))
                    </button>
                  </div>
                </div>
              ) : (
                /* Deletion Tab */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleDeleteHead}
                      disabled={list.length === 0}
                      className="rounded-xl bg-red-600 px-4 py-2 font-sans text-xs font-semibold text-white shadow-sm hover:bg-red-700 disabled:opacity-40"
                    >
                      Delete from Head (O(1))
                    </button>

                    <button
                      onClick={handleDeleteTail}
                      disabled={list.length === 0}
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 font-sans text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-40"
                    >
                      Delete from Tail (O(n))
                    </button>
                  </div>

                  {/* Position Delete */}
                  <div className="flex flex-wrap items-center gap-3 border-t border-[#F0EBE4] pt-4">
                    <label className="font-sans text-xs font-semibold text-[#8C837B]">
                      Delete at Index:
                    </label>
                    <input
                      type="number"
                      min="0"
                      max={Math.max(0, list.length - 1)}
                      value={deletePos}
                      onChange={(e) => setDeletePos(e.target.value)}
                      className="w-20 rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-2 font-mono text-sm focus:border-[#A1764E] focus:outline-none"
                    />
                    <button
                      onClick={handleDeleteAtPosition}
                      disabled={list.length === 0}
                      className="rounded-xl border border-red-300 bg-white px-4 py-2 font-sans text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40"
                    >
                      Delete Node at Index {deletePos} (O(n))
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Theory & Pseudocode */}
          <div className="space-y-6">
            {/* Operation Info Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                <Sparkles size={16} />
                <span>Active Operation</span>
              </div>

              <h3 className="mt-2 font-display text-2xl text-[#1F1B18]">
                {currentOpInfo.name}
              </h3>

              <p className="mt-3 font-serif text-sm leading-relaxed text-[#6B5B4D]">
                {currentOpInfo.desc}
              </p>

              <div className="mt-5 border-t border-[#EEE5DB] pt-4">
                <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#8C837B]">
                  Complexity
                </h4>
                <div className="mt-2 rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] p-3 text-center">
                  <span className="block text-[10px] uppercase tracking-wider text-[#8C837B]">
                    Theoretical Algorithmic Time
                  </span>
                  <span className="font-mono text-base font-bold text-[#3D5A37]">
                    {currentOpInfo.complexity}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#8C837B]">
                    (Theoretical pointer updates; JavaScript simulation copies array state immutably)
                  </span>
                </div>
              </div>
            </div>

            {/* Pseudocode Block */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                  <Code2 size={16} />
                  <span>Routine Pseudocode</span>
                </div>
                <span className="font-mono text-[10px] text-[#8C837B]">
                  Algorithm
                </span>
              </div>

              <pre className="overflow-x-auto rounded-2xl border border-[#E8DDD1] bg-[#1F1B18] p-4 font-mono text-xs leading-relaxed text-[#F7F5F2]">
                <code>{currentOpInfo.pseudocode}</code>
              </pre>
            </div>

            {/* Architectural Takeaways */}
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
                    <strong>Head vs Array[0]:</strong> Inserting at the head of
                    a linked list is O(1) without element shifts, unlike an
                    array where all elements must be shifted right (O(n)).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    size={14}
                    className="mt-0.5 shrink-0 text-[#3D5A37]"
                  />
                  <span>
                    <strong>No Random Access:</strong> Accessing index k requires
                    following k consecutive next pointers sequentially.
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
