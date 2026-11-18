import { Info, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export default function BSTStepExplanation({ frame = null, operation = null }) {
  if (!frame) {
    return (
      <div className="rounded-2xl border border-[#E8DDD1] bg-[#FAF8F5] p-5 text-sm text-[#736353]">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} className="text-[#A1764E]" />
          <span className="font-semibold text-[#1F1B18]">Ready for Inspection</span>
        </div>
        <p className="mt-1 text-xs text-[#6B5B4D]">
          Select an operation above (Insert, Search, or Delete) and specify a value to begin stepping through the BST decision tree.
        </p>
      </div>
    );
  }

  const isFinal = frame.isFinal;
  const isError = frame.status === "not-found" || frame.status === "duplicate";

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm transition-colors ${
        isFinal
          ? isError
            ? "border-[#F5C2C7] bg-[#FFF5F5]"
            : "border-[#C3E6CB] bg-[#F4FAF6]"
          : "border-[#E8DDD1] bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        {isFinal ? (
          isError ? (
            <AlertCircle size={22} className="mt-0.5 text-[#D93025]" />
          ) : (
            <CheckCircle2 size={22} className="mt-0.5 text-[#1E7E34]" />
          )
        ) : (
          <Info size={22} className="mt-0.5 text-[#A1764E]" />
        )}

        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-serif text-base font-bold text-[#1F1B18]">
              {frame.title}
            </h3>
            {operation && (
              <span className="rounded-full bg-[#FAF0E6] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#A1764E]">
                {operation.type} {operation.value}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm leading-relaxed text-[#5A4C3F]">
            {frame.description}
          </p>

          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-[#8C7A6B]">
            <span>BST Rule:</span>
            <span className="rounded bg-[#FAF6F0] px-1.5 py-0.5 text-[#6B5B4D]">
              left &lt; root &lt; right
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
