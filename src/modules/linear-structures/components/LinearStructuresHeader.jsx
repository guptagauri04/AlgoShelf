import { ArrowLeft, Clock3, Layers, GitCommit, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function LinearStructuresHeader({ activeTab, onTabChange }) {
  return (
    <header className="border-b border-[#ECE3D8] bg-[#F7F5F2]">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8 md:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#E8DED2] bg-white/80 px-4 py-2 text-sm font-medium text-[#6B5B4D] transition hover:border-[#D7C5AF] hover:bg-white"
        >
          <ArrowLeft size={16} />
          Back to Bookshelf
        </Link>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-[#D8C5B0]" />
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#A1764E]">
                Book IV · Linear Structures
              </p>
            </div>

            <h1 className="mt-6 font-display text-6xl leading-[0.95] text-[#1F1B18] sm:text-7xl md:text-8xl">
              Stacks &amp; Queues
            </h1>

            <p className="mt-4 text-xl text-[#7A7068]">
              Restricted linear collections governed by LIFO and FIFO protocols.
            </p>

            <div className="mt-6 h-[2px] w-16 rounded-full bg-[#A1764E]" />

            <div className="mt-8 max-w-xl border-l-2 border-[#DDD2C5] pl-6 text-[#5F5952]">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
                Editorial Note
              </p>
              <p className="mt-2 text-base leading-7 italic">
                “By constraining where data enters and exits, we transform raw storage into the disciplined pipelines that power compilers, operating systems, and network routers.”
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E8DDD1] bg-white px-3.5 py-1.5 font-medium text-[#6B5B4D]">
                <Clock3 size={15} /> 8 min interactive
              </span>
              <span className="rounded-full bg-amber-100 px-3.5 py-1.5 font-medium text-amber-800">
                Foundations
              </span>
              <span className="rounded-full border border-[#E8DDD1] bg-[#FCFBF8] px-3.5 py-1.5 font-medium text-[#8C837B]">
                O(1) Time Primary Operations
              </span>
            </div>
          </div>

          {/* Interactive Mode Switcher Card */}
          <div className="rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-7 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A1764E]">
              <Sparkles size={16} />
              Select Visualizer Module
            </div>
            <p className="mt-3 text-sm leading-6 text-[#5F5952]">
              Switch between the Last In, First Out (LIFO) Stack and the First In, First Out (FIFO) Queue to observe how boundary access rules govern memory traversal.
            </p>

            {/* Segmented Control */}
            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl border border-[#E8DDD1] bg-white p-1.5">
              <button
                type="button"
                onClick={() => onTabChange("stack")}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
                  activeTab === "stack"
                    ? "bg-[#1F1B18] text-white shadow-sm"
                    : "text-[#6B5B4D] hover:bg-[#FAF8F5]"
                }`}
              >
                <Layers size={16} />
                <span>Stack (LIFO)</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange("queue")}
                className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition ${
                  activeTab === "queue"
                    ? "bg-[#1F1B18] text-white shadow-sm"
                    : "text-[#6B5B4D] hover:bg-[#FAF8F5]"
                }`}
              >
                <GitCommit size={16} />
                <span>Queue (FIFO)</span>
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-[#EEE5DB] bg-[#FAF8F5] p-3 text-xs leading-5 text-[#8C837B]">
              <strong className="text-[#1F1B18]">Current Focus:</strong>{" "}
              {activeTab === "stack"
                ? "Push, Pop, and Peek via the single-ended top pointer."
                : "Enqueue at Rear, Dequeue from Front via dual-ended pointers."}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
