import { Lightbulb, ChevronRight } from "lucide-react";

export default function TraversalStepExplanation({ message }) {
  if (!message) return null;

  return (
    <section className="mt-8 rounded-3xl border border-[#E8DDD1] bg-white p-8 shadow-sm">

      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.35em] text-[#A1764E]">
          Current Step
        </p>

        <ChevronRight
          size={18}
          className="text-[#C5B7A8]"
        />
      </div>

      <h3 className="mt-4 font-Cormorant text-4xl leading-none text-[#1F1B18]">
        {message.title}
      </h3>

      <p className="mt-5 max-w-3xl text-[17px] leading-8 text-[#5F5952]">
        {message.description}
      </p>

      <div className="mt-8 rounded-2xl border border-[#EDE3D7] bg-[#FCFBF8] p-6">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F4ECE3]">
            <Lightbulb
              size={18}
              className="text-[#A1764E]"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#A1764E]">
              Why this matters
            </p>

            <p className="text-xs text-[#8C837B]">
              Array intuition
            </p>
          </div>
        </div>

        <p className="mt-5 leading-8 text-[#5F5952]">
          {message.insight}
        </p>
      </div>
    </section>
  );
}
