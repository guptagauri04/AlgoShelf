import { Lightbulb, Footprints } from "lucide-react";

const PHASE_BADGE = {
  init:         { label: "Initializing",    color: "bg-[#EEE5DB] text-[#8C837B]" },
  select:       { label: "Selecting Node",  color: "bg-[#FEF9EE] text-[#8B5A2B]" },
  relax:        { label: "Relaxing Edge",   color: "bg-[#FEF9EE] text-[#8B5A2B]" },
  relax_update: { label: "Path Updated",    color: "bg-[#EAF2E8] text-[#3D5A37]" },
  skip:         { label: "Already Visited", color: "bg-[#EEE5DB] text-[#6B645D]" },
  done:         { label: "Complete",        color: "bg-[#EAF2E8] text-[#3D5A37]" },
};

export default function DijkstraStepExplanation({ frame, currentStep, totalSteps }) {
  if (!frame) {
    return (
      <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Step Explanation
        </p>
        <p className="mt-3 text-sm text-[#8C837B]">
          Select source & destination, then click <strong>Run Dijkstra</strong> to start.
        </p>
      </div>
    );
  }

  const { message, phase } = frame;
  const badge = PHASE_BADGE[phase] || PHASE_BADGE.init;

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm space-y-4">
      {/* Phase badge */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Step Explanation
        </p>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.color}`}>
          {badge.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl text-[#1F1B18] leading-tight">
        {message?.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-6 text-[#6B645D]">{message?.description}</p>

      {/* Insight */}
      {message?.insight && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-4">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-[#A1764E]" />
          <p className="text-xs leading-5 text-[#6B645D] italic">{message.insight}</p>
        </div>
      )}

      {/* Step counter */}
      <div className="flex items-center gap-2 text-xs text-[#8C837B]">
        <Footprints size={13} />
        Step {currentStep + 1} of {totalSteps}
      </div>
    </div>
  );
}
