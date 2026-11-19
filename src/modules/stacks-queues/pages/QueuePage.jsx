import { useState, useRef } from "react";
import { ArrowLeft, Clock3, Eye, Plus, RotateCw, Sparkles, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../../components/Footer";
import QueueVisualizer from "../components/QueueVisualizer";
import { queueContent } from "../data/queueContent";

export default function QueuePage() {
  const nextId = useRef(4);
  const maxCapacity = 6;

  const [buffer, setBuffer] = useState([
    { id: "q-1", value: 34 },
    { id: "q-2", value: 67 },
    { id: "q-3", value: 91 },
    null,
    null,
    null,
  ]);
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(3);
  const [size, setSize] = useState(3);

  const [inputValue, setInputValue] = useState("");
  const [highlightFront, setHighlightFront] = useState(false);
  const [message, setMessage] = useState(null);

  const handleEnqueue = () => {
    if (size >= maxCapacity) {
      setMessage({
        type: "error",
        text: `Queue Overflow! Cannot enqueue into a full circular buffer (Maximum capacity is ${maxCapacity}).`,
      });
      return;
    }

    const trimmed = inputValue.trim();
    const val = trimmed === "" ? Math.floor(Math.random() * 90) + 10 : Number(trimmed);

    if (!Number.isFinite(val)) {
      setMessage({ type: "error", text: "Please enter a valid numeric value to enqueue." });
      return;
    }

    const newItem = { id: `q-${nextId.current++}`, value: val };
    const nextRear = (rear + 1) % maxCapacity;

    setBuffer((prev) => {
      const next = [...prev];
      next[rear] = newItem;
      return next;
    });

    setRear(nextRear);
    setSize((prev) => prev + 1);
    setInputValue("");
    setHighlightFront(false);
    setMessage({
      type: "success",
      text: `Enqueued ${val} at index ${rear} (O(1) pointer update; O(C) React buffer copy). Advanced rear = (${rear} + 1) % ${maxCapacity} = ${nextRear}.`,
    });
  };

  const handleDequeue = () => {
    if (size === 0) {
      setMessage({
        type: "error",
        text: "Queue Underflow! Cannot dequeue from an empty queue.",
      });
      return;
    }

    const dequeuedItem = buffer[front];
    const nextFront = (front + 1) % maxCapacity;

    setBuffer((prev) => {
      const next = [...prev];
      next[front] = null;
      return next;
    });

    setFront(nextFront);
    setSize((prev) => prev - 1);
    setHighlightFront(false);
    setMessage({
      type: "success",
      text: `Dequeued value ${dequeuedItem?.value} from index ${front} (O(1) pointer update; O(C) React buffer copy). Advanced front = (${front} + 1) % ${maxCapacity} = ${nextFront}. (Zero array elements shifted).`,
    });
  };

  const handleFront = () => {
    if (size === 0) {
      setMessage({
        type: "error",
        text: "Cannot inspect an empty queue.",
      });
      return;
    }

    const frontItem = buffer[front];
    setHighlightFront(true);
    setMessage({
      type: "info",
      text: `Front element is ${frontItem?.value} at index ${front} (O(1) read). Next in line to dequeue.`,
    });
  };

  const handleClear = () => {
    setBuffer(new Array(maxCapacity).fill(null));
    setFront(0);
    setRear(0);
    setSize(0);
    setHighlightFront(false);
    setMessage({
      type: "info",
      text: "Queue has been cleared. Front and Rear pointers reset to 0 in O(1) logical time.",
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
                  Chapter II · Linear Structures
                </p>
              </div>

              <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl">
                {queueContent.title}
              </h1>

              <p className="mt-4 text-xl text-[#7A7068]">
                {queueContent.subtitle}
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
                  Circular Array FIFO
                </span>
              </div>
            </div>

            {/* Mental Model Card */}
            <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                <Sparkles size={16} />
                Circular Array Principle
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5F5952]">
                In a naive array queue, dequeueing shifts all subsequent items left by one position, costing O(n) time. By wrapping front and rear pointers with modulo arithmetic (<code className="font-mono text-xs">(ptr + 1) % capacity</code>), elements remain in place and operations run in strict O(1) time.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Interactive Work Area */}
      <main className="mx-auto max-w-7xl px-6 py-14 md:px-8 space-y-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Visualizer */}
          <QueueVisualizer
            buffer={buffer}
            front={front}
            rear={rear}
            size={size}
            maxCapacity={maxCapacity}
            highlightFront={highlightFront}
            message={message}
          />

          {/* Controls Card */}
          <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
                Operations
              </p>
              <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
                Queue Actions
              </h3>
            </div>

            {/* Enqueue Input */}
            <div>
              <label
                htmlFor="queue-enqueue-value"
                className="mb-2 block text-sm font-medium text-[#514940]"
              >
                Value to Enqueue
              </label>
              <div className="flex gap-3">
                <input
                  id="queue-enqueue-value"
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g. 78"
                  className="h-11 flex-1 rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
                />
                <button
                  type="button"
                  onClick={handleEnqueue}
                  disabled={size >= maxCapacity}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
                >
                  <Plus size={16} />
                  Enqueue
                </button>
              </div>
            </div>

            {/* Dequeue & Front Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDequeue}
                disabled={size === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#C87865] bg-[#FDF5F3] text-sm font-semibold text-[#8C3D2D] transition hover:bg-[#F9E8E3] disabled:opacity-40"
              >
                <Trash2 size={16} />
                Dequeue()
              </button>

              <button
                type="button"
                onClick={handleFront}
                disabled={size === 0}
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl border border-[#DDD2C6] bg-white text-sm font-semibold text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] disabled:opacity-40"
              >
                <Eye size={16} />
                Front()
              </button>
            </div>

            <div className="border-t border-[#EEE5DB] pt-4">
              <button
                type="button"
                onClick={handleClear}
                disabled={size === 0}
                className="text-xs font-medium text-[#8C837B] hover:text-[#A84533] transition"
              >
                Clear entire queue
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
              <RotateCw size={14} />
              <span>O(1) Guaranteed via Modulo Ring Buffer</span>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {queueContent.operations.map((op) => (
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
              Why Circular Array Achieves O(1) Algorithmic Time vs. O(C) React State Snapshot
            </h4>
            <p className="text-sm leading-6 text-[#6B645D]">
              In low-level systems (C/C++ and OS circular ring buffers), Enqueue and Dequeue only update the integer pointers via modulo arithmetic (<code className="font-mono text-xs">(ptr + 1) % capacity</code>) and write directly to the slot, executing in strict <strong>O(1)</strong> constant time with zero element shifting.
            </p>
            <p className="text-sm leading-6 text-[#6B645D]">
              In React&apos;s declarative state paradigm, updating component state requires a shallow copy of the circular buffer (<code className="font-mono text-xs">[...buffer]</code>), executing in <strong>O(C)</strong> time where <code className="font-mono text-xs">C = 6</code> is the fixed capacity. Front, Rear, and isEmpty remain pure <strong>O(1)</strong> reads without copying. While React produces an immutable state snapshot to trigger virtual DOM diffing, the core circular queue algorithm remains strictly <strong>O(1)</strong> with zero elements shifted in memory.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
