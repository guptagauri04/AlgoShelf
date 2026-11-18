import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import Footer from "../../../components/Footer";
import StackVisualizer from "../components/StackVisualizer";
import StackControls from "../components/StackControls";
import StackStepExplanation from "../components/StackStepExplanation";
import { INITIAL_STACK_ELEMENTS, DEFAULT_STACK_CAPACITY } from "../data/stackData";

export default function StackPage() {
  const capacity = DEFAULT_STACK_CAPACITY;
  const [items, setItems] = useState([...INITIAL_STACK_ELEMENTS]);
  const [highlightTop, setHighlightTop] = useState(null);
  const [error, setError] = useState(null);
  const [lastAction, setLastAction] = useState({
    type: "ready",
    message: `Initialized stack with ${INITIAL_STACK_ELEMENTS.length} elements (Capacity: ${capacity}).`,
    pointerFormula: `Top = [${INITIAL_STACK_ELEMENTS.length - 1}]`,
  });

  const isFull = items.length >= capacity;
  const isEmpty = items.length === 0;

  const handlePush = (value) => {
    if (isFull) {
      setError(`Stack Overflow! Cannot push ${value}: maximum capacity (${capacity}) reached.`);
      return;
    }

    setError(null);
    const newItems = [...items, value];
    setItems(newItems);
    setHighlightTop("push");
    setLastAction({
      type: "push",
      message: `Pushed value ${value} onto the stack. Top pointer incremented.`,
      pointerFormula: `top = top + 1 = ${newItems.length - 1}`,
    });

    setTimeout(() => setHighlightTop(null), 800);
  };

  const handlePop = () => {
    if (isEmpty) {
      setError("Stack Underflow! Cannot pop from an empty stack.");
      return;
    }

    setError(null);
    const poppedValue = items[items.length - 1];
    setHighlightTop("pop");

    setTimeout(() => {
      const newItems = items.slice(0, -1);
      setItems(newItems);
      setHighlightTop(null);
      setLastAction({
        type: "pop",
        message: `Popped value ${poppedValue} from the top. Top pointer decremented.`,
        pointerFormula: `top = top - 1 = ${newItems.length - 1}`,
      });
    }, 300);
  };

  const handlePeek = () => {
    if (isEmpty) {
      setError("Cannot peek: stack is empty.");
      return;
    }

    setError(null);
    setHighlightTop("peek");
    const topValue = items[items.length - 1];
    setLastAction({
      type: "peek",
      message: `Current top value is ${topValue} at index [${items.length - 1}].`,
      pointerFormula: `items[top] = items[${items.length - 1}] = ${topValue}`,
    });

    setTimeout(() => setHighlightTop(null), 800);
  };

  const handleReset = () => {
    setItems([...INITIAL_STACK_ELEMENTS]);
    setHighlightTop(null);
    setError(null);
    setLastAction({
      type: "ready",
      message: "Reset stack to initial configuration.",
      pointerFormula: `Top = [${INITIAL_STACK_ELEMENTS.length - 1}]`,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] text-[#1F1B18]">
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
        {/* Navigation Breadcrumb */}
        <Link
          to="/learn/stacks"
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8EA2BA]"
        >
          <ArrowLeft size={16} />
          Back to Linear Structures
        </Link>

        {/* Page Header */}
        <header className="mt-8 border-b border-[#E8DDD1] pb-8 md:mt-10">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E9EDF5] px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#5A7088]">
              Linear Structures · Chapter I
            </span>
            <span className="text-xs text-[#8C837B]">Interactive Laboratory</span>
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight text-[#1F1B18] sm:text-5xl md:text-6xl">
            Stack Operations &amp; Frame Trace
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-[#6B645D] md:text-lg">
            Experience the Last In, First Out (LIFO) discipline in action. Push elements onto the stack,
            pop elements from the top boundary, and guard against overflow and underflow conditions.
          </p>
        </header>

        {/* Controls Section */}
        <section className="mt-8">
          <StackControls
            onPush={handlePush}
            onPop={handlePop}
            onPeek={handlePeek}
            onReset={handleReset}
            isFull={isFull}
            isEmpty={isEmpty}
            error={error}
          />
        </section>

        {/* Visualizer Section */}
        <section className="mt-6">
          <StackVisualizer
            items={items}
            capacity={capacity}
            highlightTop={highlightTop}
          />
        </section>

        {/* Step Explanation & Complexity Metrics */}
        <section className="mt-6">
          <StackStepExplanation
            lastAction={lastAction}
            size={items.length}
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
              Core Principles of Stack Memory
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#5A7088]">
                LIFO Access Pattern
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                Data items can only be retrieved in reverse of the sequence in which they arrived. This makes stacks the optimal primitive for syntax parsers, call frames, and backtracking engines.
              </p>
            </div>
            <div className="rounded-2xl border border-[#EEE5DB] bg-white p-5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#4B7754]">
                True O(1) Operations
              </span>
              <p className="mt-2 text-sm leading-6 text-[#6B645D]">
                Because push, pop, and peek only interact with the top pointer (<code className="font-mono text-[#D97706]">top = items.length - 1</code>), no elements ever need to be shifted in memory.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
