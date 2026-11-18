import { Clock, Database, Terminal } from "lucide-react";

export default function LinkedListStepCard({ frame, currentStepIndex, totalSteps }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
      {/* Left: Step Explanation & Code */}
      <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center justify-between border-b border-[#EEE5DB] pb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            Step Execution Details
          </p>
          {totalSteps > 0 && (
            <span className="font-mono text-xs font-semibold text-[#8C837B]">
              Step {currentStepIndex + 1} of {totalSteps}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold text-[#1F1B18]">
          {frame.title}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-[#6B645D]">
          {frame.explanation}
        </p>

        {frame.code && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-[#2D2A26] bg-[#1E1C1A] p-4 text-[#E6E1DC]">
            <div className="flex items-center gap-2 border-b border-[#3E3A35] pb-2 text-[11px] font-mono text-[#A89F95]">
              <Terminal size={14} />
              <span>Pointer Logic</span>
            </div>
            <pre className="mt-3 overflow-x-auto font-mono text-xs leading-relaxed text-[#EAD8C2]">
              <code>{frame.code}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Right: Complexity Cards */}
      <div className="flex flex-col gap-4">
        <div className="flex-1 rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
            <Clock size={16} />
            <span>Time Complexity</span>
          </div>
          <p className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            {frame.timeComplexity || "O(1)"}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#8C837B]">
            {frame.timeComplexity === "O(1)"
              ? "Constant time: Direct pointer reassignment at the head without any list traversal."
              : "Linear time: Requires sequential traversal along pointer links to locate target or predecessor node."}
          </p>
        </div>

        <div className="flex-1 rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#5A7354]">
            <Database size={16} />
            <span>Space Complexity</span>
          </div>
          <p className="mt-3 font-mono text-3xl font-bold text-[#1F1B18]">
            {frame.spaceComplexity || "O(1)"}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-[#8C837B]">
            O(1) auxiliary space: Only a temporary pointer variable is maintained during the operation.
          </p>
        </div>
      </div>
    </div>
  );
}
