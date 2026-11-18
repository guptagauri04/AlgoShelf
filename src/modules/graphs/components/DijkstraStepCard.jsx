import { Lightbulb, Navigation } from "lucide-react";

export default function DijkstraStepCard({ frame, currentStepIndex = 0, totalSteps = 1 }) {
  if (!frame || !frame.message) return null;

  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-2">
          <Navigation size={15} className="text-[#A1764E]" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Step {currentStepIndex + 1} of {totalSteps}
          </p>
        </div>
        {frame.currentNode && (
          <span className="rounded-full bg-[#FEF9EE] px-3 py-1 font-mono text-xs font-bold text-[#8B5A2B]">
            Active Vertex: {frame.currentNode}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
        {frame.message.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#5F5952]">
        {frame.message.description}
      </p>

      {/* Intuition Box */}
      {frame.message.insight && (
        <div className="mt-6 rounded-2xl border border-[#EDE3D7] bg-[#FCFBF8] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4ECE3]">
              <Lightbulb size={17} className="text-[#A1764E]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                Why This Step Works
              </p>
              <p className="text-xs text-[#8C837B]">Dijkstra Invariant</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#5F5952]">
            {frame.message.insight}
          </p>
        </div>
      )}
    </section>
  );
}
