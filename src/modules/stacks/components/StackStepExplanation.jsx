import { Info, Gauge } from "lucide-react";

export default function StackStepExplanation({
  lastAction = null,
  size = 0,
  capacity = 7,
  isEmpty = false,
  isFull = false,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Operation Explanation Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#A1764E]">
            <Info size={16} />
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
              Operation Trace
            </h4>
          </div>
          {lastAction?.type && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-bold ${
                lastAction.type === "push"
                  ? "bg-[#E6EFE6] text-[#2D4B34]"
                  : lastAction.type === "pop"
                  ? "bg-[#FEE2E2] text-[#991B1B]"
                  : "bg-[#FEF3C7] text-[#92400E]"
              }`}
            >
              {lastAction.type.toUpperCase()}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#4A3B32]">
          {lastAction?.message || "Perform a Push, Pop, or Peek operation to trace the top pointer advance and stack state."}
        </p>

        {lastAction?.pointerFormula && (
          <div className="mt-4 rounded-xl border border-[#EEE5DB] bg-white p-3 font-mono text-xs">
            <span className="text-[#8C837B]">Pointer math: </span>
            <strong className="text-[#A1764E]">{lastAction.pointerFormula}</strong>
          </div>
        )}
      </div>

      {/* State & Metrics Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#A1764E]">
          <Gauge size={16} />
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
            Stack State &amp; Time Complexity
          </h4>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Status</span>
            <p className="mt-1 font-bold text-[#1F1B18]">
              {isFull ? (
                <span className="text-[#DC2626]">FULL (Overflow Risk)</span>
              ) : isEmpty ? (
                <span className="text-[#D97706]">EMPTY (Underflow)</span>
              ) : (
                <span className="text-[#4B7754]">Ready ({capacity - size} free)</span>
              )}
            </p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Push Time</span>
            <p className="mt-1 text-base font-bold text-[#4B7754]">O(1)</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Pop Time</span>
            <p className="mt-1 text-base font-bold text-[#4B7754]">O(1)</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Space Complexity</span>
            <p className="mt-1 text-base font-bold text-[#A1764E]">O(n)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
