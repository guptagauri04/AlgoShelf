import { Info, BarChart2 } from "lucide-react";

export default function BSTStepExplanation({
  currentStep,
  operationType = "idle",
  metrics = { count: 0, height: 0, min: null, max: null },
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {/* Step Description Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#A1764E]">
            <Info size={16} />
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
              Operation Trace ({operationType.toUpperCase()})
            </h4>
          </div>
          {currentStep?.status && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-bold ${
                currentStep.status === "found" || currentStep.status === "inserted"
                  ? "bg-[#E6EFE6] text-[#2D4B34]"
                  : currentStep.status === "deleting"
                  ? "bg-[#FEE2E2] text-[#991B1B]"
                  : currentStep.status === "duplicate" || currentStep.status === "not_found"
                  ? "bg-[#FEF3C7] text-[#92400E]"
                  : "bg-[#F7F2EB] text-[#6B5B4D]"
              }`}
            >
              {currentStep.status.toUpperCase()}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-[#4A3B32]">
          {currentStep?.explanation || "Select an operation above to trace node traversal and tree updates step by step."}
        </p>

        {currentStep?.comparison && (
          <div className="mt-4 rounded-xl border border-[#EEE5DB] bg-white p-3 font-mono text-xs">
            <span className="text-[#8C837B]">Comparison evaluated: </span>
            <strong className="text-[#A1764E]">{currentStep.comparison}</strong>
          </div>
        )}
      </div>

      {/* Tree Metrics Card */}
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
        <div className="flex items-center gap-2 text-[#A1764E]">
          <BarChart2 size={16} />
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-[#1F1B18]">
            BST Properties &amp; Metrics
          </h4>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Node Count</span>
            <p className="mt-1 text-lg font-bold text-[#1F1B18]">{metrics.count}</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Tree Height</span>
            <p className="mt-1 text-lg font-bold text-[#1F1B18]">{metrics.height}</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Min Value</span>
            <p className="mt-1 text-base font-bold text-[#4B7754]">{metrics.min ?? "—"}</p>
          </div>
          <div className="rounded-xl border border-[#EEE5DB] bg-white p-3">
            <span className="text-[11px] text-[#8C837B] uppercase tracking-wider">Max Value</span>
            <p className="mt-1 text-base font-bold text-[#A1764E]">{metrics.max ?? "—"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
