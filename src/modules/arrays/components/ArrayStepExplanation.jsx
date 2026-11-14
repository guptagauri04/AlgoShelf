import { Lightbulb } from "lucide-react";

export default function ArrayStepExplanation({ frame, currentStep, stepCount }) {
  if (!frame) return null;

  return (
    <section
      aria-live="polite"
      className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Step {currentStep + 1} · {stepCount}
        </p>
        <Lightbulb size={19} className="shrink-0 text-[#A1764E]" />
      </div>
      <h2 className="mt-3 font-display text-3xl text-[#1F1B18]">
        {frame.title}
      </h2>
      <p className="mt-3 leading-7 text-[#5F5952]">{frame.description}</p>
    </section>
  );
}
