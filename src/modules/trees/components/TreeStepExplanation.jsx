import { ChevronRight, Lightbulb } from "lucide-react";

export default function TreeStepExplanation({
  message,
  currentStep = 0,
  totalSteps = 0,
  traversalType = "inorder",
}) {
  if (!message) return null;

  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Step {currentStep + 1} of {totalSteps > 0 ? totalSteps : 1}
          </p>
          <ChevronRight size={14} className="text-[#C5B7A8]" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#6B645D]">
            {traversalType} Traversal
          </span>
        </div>
      </div>

      <h3 className="mt-4 font-display text-3xl text-[#1F1B18]">
        {message.title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#5F5952]">
        {message.description}
      </p>

      {/* Intuition Box */}
      {message.insight && (
        <div className="mt-6 rounded-2xl border border-[#EDE3D7] bg-[#FCFBF8] p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F4ECE3]">
              <Lightbulb size={17} className="text-[#A1764E]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
                Why This Matters
              </p>
              <p className="text-xs text-[#8C837B]">Traversal Intuition</p>
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-[#5F5952]">
            {message.insight}
          </p>
        </div>
      )}
    </section>
  );
}
