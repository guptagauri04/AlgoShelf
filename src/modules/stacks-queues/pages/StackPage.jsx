import { useState, useRef } from "react";
import { ArrowLeft, Clock3, Eye, Layers, Plus, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import StackVisualizer from "../components/StackVisualizer";
import { stackContent } from "../data/stackContent";

export default function StackPage() {
  const nextId = useRef(4);
  const maxCapacity = 6;

  const [buffer, setBuffer] = useState([
    { id: "s-1", value: 12 },
    { id: "s-2", value: 45 },
    { id: "s-3", value: 89 },
    null,
    null,
    null,
  ]);
  const [top, setTop] = useState(2);

  const [inputValue, setInputValue] = useState("");
  const [highlightTop, setHighlightTop] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePush = () => {
    if (top >= maxCapacity - 1) {
      setMessage({
        type: "error",
        text: `Stack Overflow! Cannot push into a full stack (Maximum capacity is ${maxCapacity}).`,
      });
      return;
    }

    const trimmed = inputValue.trim();
    const val = trimmed === "" ? Math.floor(Math.random() * 90) + 10 : Number(trimmed);

    if (!Number.isFinite(val)) {
      setMessage({ type: "error", text: "Please enter a valid numeric value to push." });
      return;
    }

    const newTop = top + 1;
    const newItem = { id: `s-${nextId.current++}`, value: val };

    setBuffer((prev) => {
      const next = [...prev];
      next[newTop] = newItem;
      return next;
    });
    setTop(newTop);
    setInputValue("");
    setHighlightTop(false);
    setMessage({
      type: "success",
      text: `Pushed value ${val} at index ${newTop} (O(1) pointer update; O(C) React buffer copy). Advanced top pointer to index ${newTop}.`,
    });
  };

  const handlePop = () => {
    if (top < 0) {
      setMessage({
        type: "error",
        text: "Stack Underflow! Cannot pop from an empty stack.",
      });
      return;
    }

    const poppedItem = buffer[top];
    setBuffer((prev) => {
      const next = [...prev];
      next[top] = null;
      return next;
    });
    const newTop = top - 1;

    setTop(newTop);
    setHighlightTop(false);
    setMessage({
      type: "success",
      text: `Popped value ${poppedItem?.value} from index ${top} (O(1) pointer update; O(C) React buffer copy). Decremented top pointer to index ${newTop}. (Zero array elements shifted).`,
    });
  };

  const handlePeek = () => {
    if (top < 0) {
      setMessage({
        type: "error",
        text: "Cannot peek an empty stack.",
      });
      return;
    }

    const topItem = buffer[top];
    setHighlightTop(true);
    setMessage({
      type: "info",
      text: `Top element is ${topItem?.value} at index ${top} (O(1) read). Peek does not modify the stack.`,
    });
  };

  const handleClear = () => {
    setBuffer(new Array(maxCapacity).fill(null));
    setTop(-1);
    setHighlightTop(false);
    setMessage({
      type: "info",
      text: "Stack has been cleared. Top pointer reset to -1 in O(1) logical time.",
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      {/* Editorial Chapter Header */}
      <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
          <Link
            to="/learn/stacks-queues"
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
          >
            <ArrowLeft size={16} />
            Back to Stacks &amp; Queues
          </Link>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-[#D8C5B0]" />
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                  Chapter I · Linear Structures
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl">
                {stackContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {stackContent.subtitle}
              </p>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

              <div className="mt-8 flex flex-wrap gap-3 text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                  <Clock3 size={15} /> 5 min lesson
                </span>
                <span className="rounded-full bg-green-100 px-3.5 py-1.5 font-medium text-green-700">
                  Beginner
                </span>
                <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                  Pointer-Based LIFO
                </span>
              </div>
            </div>

            {/* Intuition Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                Pointer-Based LIFO Mental Model
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                A stack maintains a direct pointer index to the current top item. Pushing increments the pointer and writes to that memory cell. Popping reads the cell and decrements the pointer. Because elements are accessed in-place and never shifted, all operations execute in strict O(1) time.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Work Area */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Visualizer */}
          <StackVisualizer
            buffer={buffer}
            top={top}
            maxCapacity={maxCapacity}
            highlightTop={highlightTop}
            message={message}
          />

          {/* Controls Card */}
          <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
                Operations
              </p>
              <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
                Stack Actions
              </h3>
            </div>

            {/* Push Input */}
            <div>
              <label
                htmlFor="stack-push-value"
                className="mb-2 block text-sm font-medium text-[#514940]"
              >
                Value to Push
              </label>
              <div className="flex gap-3">
                <input
                  id="stack-push-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 52"
                  className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                />
                <button
                  type="button"
                  onClick={handlePush}
                  disabled={top >= maxCapacity - 1}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
                >
                  <Plus size={16} />
                  Push
                </button>
              </div>
            </div>

            {/* Pop & Peek Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handlePop}
                disabled={top < 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#C87865] bg-[#FDF5F3] text-sm font-semibold text-[#8C3D2D] transition hover:bg-[#F9E8E3] disabled:opacity-40"
              >
                <Trash2 size={16} />
                Pop()
              </button>

              <button
                type="button"
                onClick={handlePeek}
                disabled={top < 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#DDD2C6] bg-white text-sm font-semibold text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] disabled:opacity-40"
              >
                <Eye size={16} />
                Peek()
              </button>
            </div>

            <div className="border-t border-[#EEE5DB] pt-4">
              <button
                type="button"
                onClick={handleClear}
                disabled={top < 0}
                className="text-xs font-medium text-[#8C837B] hover:text-[#A84533] transition"
              >
                Clear entire stack
              </button>
            </div>
          </div>
        </div>

        {/* Complexity & Comparison Section */}
        <section className="pt-8 border-t border-[#ECE3D8] space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                Complexity Analysis
              </p>
              <h2 className="mt-2 font-display text-4xl text-[#1F1B18]">
                Operation Complexity
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[#D8C7B5] bg-[#FAF8F5] px-4 py-1.5 text-xs font-medium text-[#8C6B48]">
              <Layers size={14} />
              <span>O(1) Guaranteed via Top Pointer</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stackContent.operations.map((op) => (
              <div key={op.name} className="rounded-2xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                  {op.name}
                </p>
                <h3 className="mt-2 font-mono text-3xl font-bold text-[#1F1B18]">
                  {op.complexity}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[#8C837B]">
                  {op.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Deep Intuition Box */}
          <div className="rounded-2xl border border-[#E8DDD1] bg-[#FAF8F5] p-6 space-y-3">
            <h4 className="font-display text-lg text-[#1F1B18]">
              Why Pointer-Based Stack Achieves O(1) Algorithmic Time vs. O(C) React State Snapshot
            </h4>
            <p className="text-sm leading-6 text-[#6B645D]">
              In low-level systems (C/C++ and native hardware architectures), a Stack writes or clears directly at the pre-allocated memory index <code className="font-mono text-xs">buffer[top]</code> and updates the integer pointer. This executes in genuine <strong>O(1)</strong> constant time with zero element shifting.
            </p>
            <p className="text-sm leading-6 text-[#6B645D]">
              In React&apos;s declarative state paradigm, updating component state requires a shallow copy of the fixed-capacity buffer (<code className="font-mono text-xs">[...buffer]</code>), executing in <strong>O(C)</strong> time where <code className="font-mono text-xs">C = 6</code> is the fixed capacity. Peek and isEmpty remain pure <strong>O(1)</strong> reads without copying. While React creates this immutable snapshot to trigger virtual DOM diffing, the core data structure mechanics remain strictly <strong>O(1)</strong> with zero elements shifted in memory.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
