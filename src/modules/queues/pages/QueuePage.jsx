import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import QueueVisualizer from "../components/QueueVisualizer";
import QueueControls from "../components/QueueControls";
import QueueStepExplanation from "../components/QueueStepExplanation";
import { INITIAL_QUEUE_ELEMENTS, DEFAULT_QUEUE_CAPACITY } from "../data/queueData";

export default function QueuePage() {
  const capacity = DEFAULT_QUEUE_CAPACITY;

  // Initialize buffer with starting elements
  const [buffer, setBuffer] = useState(() => {
    const arr = Array(capacity).fill(null);
    INITIAL_QUEUE_ELEMENTS.forEach((val, idx) => {
      arr[idx] = val;
    });
    return arr;
  });

  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(INITIAL_QUEUE_ELEMENTS.length - 1);
  const [size, setSize] = useState(INITIAL_QUEUE_ELEMENTS.length);
  const [error, setError] = useState(null);
  const [highlightIndices, setHighlightIndices] = useState({});
  const [lastAction, setLastAction] = useState({
    type: "ready",
    message: `Initialized queue with ${INITIAL_QUEUE_ELEMENTS.length} elements in a circular array buffer of capacity ${capacity}.`,
    formula: null,
  });

  const isFull = size === capacity;
  const isEmpty = size === 0;

  const handleEnqueue = (value) => {
    if (isFull) {
      setError(`Queue Overflow! Cannot enqueue ${value}: capacity of ${capacity} reached.`);
      return;
    }

    setError(null);
    const nextRear = size === 0 ? front : (rear + 1) % capacity;
    const newBuffer = [...buffer];
    newBuffer[nextRear] = value;

    setBuffer(newBuffer);
    setRear(nextRear);
    setSize((prev) => prev + 1);
    setHighlightIndices({ [nextRear]: "enqueue" });
    setLastAction({
      type: "enqueue",
      message: `Enqueued ${value} at rear index [${nextRear}].`,
      formula: `rear = (rear + 1) % ${capacity} = ${nextRear}`,
    });

    setTimeout(() => setHighlightIndices({}), 800);
  };

  const handleDequeue = () => {
    if (isEmpty) {
      setError("Queue Underflow! Cannot dequeue from an empty queue.");
      return;
    }

    setError(null);
    const dequeuedValue = buffer[front];
    const newBuffer = [...buffer];
    newBuffer[front] = null;

    setBuffer(newBuffer);
    setHighlightIndices({ [front]: "dequeue" });

    const nextFront = (front + 1) % capacity;
    setFront(nextFront);
    setSize((prev) => prev - 1);

    setLastAction({
      type: "dequeue",
      message: `Dequeued value ${dequeuedValue} from front index [${front}].`,
      formula: `front = (front + 1) % ${capacity} = ${nextFront}`,
    });

    setTimeout(() => setHighlightIndices({}), 800);
  };

  const handlePeekFront = () => {
    if (isEmpty) {
      setError("Cannot peek front: queue is empty.");
      return;
    }
    setError(null);
    setHighlightIndices({ [front]: "peek" });
    setLastAction({
      type: "peek",
      message: `Front item is ${buffer[front]} located at index [${front}].`,
      formula: `Read buffer[front] = ${buffer[front]}`,
    });
    setTimeout(() => setHighlightIndices({}), 800);
  };

  const handlePeekRear = () => {
    if (isEmpty) {
      setError("Cannot peek rear: queue is empty.");
      return;
    }
    setError(null);
    setHighlightIndices({ [rear]: "peek" });
    setLastAction({
      type: "peek",
      message: `Rear item is ${buffer[rear]} located at index [${rear}].`,
      formula: `Read buffer[rear] = ${buffer[rear]}`,
    });
    setTimeout(() => setHighlightIndices({}), 800);
  };

  const handleReset = () => {
    const arr = Array(capacity).fill(null);
    INITIAL_QUEUE_ELEMENTS.forEach((val, idx) => {
      arr[idx] = val;
    });
    setBuffer(arr);
    setFront(0);
    setRear(INITIAL_QUEUE_ELEMENTS.length - 1);
    setSize(INITIAL_QUEUE_ELEMENTS.length);
    setError(null);
    setHighlightIndices({});
    setLastAction({
      type: "ready",
      message: "Reset queue to initial state.",
      formula: null,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        {/* Navigation Breadcrumb */}
        <Link
          to="/learn/queues"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA2BA]"
        >
          <ArrowLeft size={16} />
          Back to Linear Structures
        </Link>

        {/* Page Header */}
        <header className="mt-8 border-b border-[#E8DDD1] pb-8 md:mt-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E9EDF5] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#5A7088]">
              Linear Structures · Chapter II
            </span>
            <span className="text-xs text-[#8C837B]">Interactive Laboratory</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
            Queue Operations &amp; Ring Buffer
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
            Experience the First In, First Out (FIFO) discipline implemented via an optimal circular
            array (ring buffer). Observe modulo arithmetic preventing $O(n)$ element shifting on every dequeue.
          </p>
        </header>

        {/* Controls Section */}
        <section className="mt-8">
          <QueueControls
            onEnqueue={handleEnqueue}
            onDequeue={handleDequeue}
            onPeekFront={handlePeekFront}
            onPeekRear={handlePeekRear}
            onReset={handleReset}
            isFull={isFull}
            isEmpty={isEmpty}
            error={error}
          />
        </section>

        {/* Visualizer Section */}
        <section className="mt-6">
          <QueueVisualizer
            buffer={buffer}
            capacity={capacity}
            front={front}
            rear={rear}
            size={size}
            highlightIndices={highlightIndices}
            lastAction={lastAction}
          />
        </section>

        {/* Step Explanation & Complexity Metrics */}
        <section className="mt-6">
          <QueueStepExplanation
            lastAction={lastAction}
            size={size}
            capacity={capacity}
            isEmpty={isEmpty}
            isFull={isFull}
          />
        </section>

        {/* Theoretical Reference */}
        <section className="mt-16 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Sparkles size={20} className="text-[#5A7088]" />
            <h2 className="font-display text-2xl text-[#1F1B18]">
              Why Circular Array (Ring Buffer)?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Naive Array Implementation: O(n) Dequeue
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                In a fixed-front array, removing the 0th element forces all subsequent $n - 1$ items to shift left by one slot. For large collections, continuous dequeues create major CPU memory copying bottlenecks.
              </p>
            </div>
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4B7754]">
                Circular Array (Ring Buffer): O(1) Dequeue
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                By advancing the <code className="font-mono text-[#D97706]">front</code> pointer with <code className="font-mono text-[#1F1B18]">(front + 1) % capacity</code>, no memory shifts occur. Both Enqueue and Dequeue operations achieve instantaneous $O(1)$ constant time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
