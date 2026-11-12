import { ArrowRight } from "lucide-react";

/**
 * "Allow users to create or enter an array" — a free text field where the
 * learner types their own values and applies them to the visualizer.
 */
export default function ArrayInput({
  value,
  onChange,
  onApply,
  error,
  disabled = false,
}) {
  return (
    <div className="mt-8 rounded-2xl border border-[#E8DDD1] bg-[#FAF7F2] p-5">

      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-[#1F1B18]">
          Create or enter an array
        </p>

        <p className="text-xs text-[#8C837B]">
          2–20 numbers, separated by commas
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onApply();
          }}
          disabled={disabled}
          placeholder="e.g. 12, 7, 19, 3, 25"
          aria-invalid={Boolean(error)}
          className="
            h-11
            flex-1
            min-w-[200px]
            rounded-xl
            border border-[#DDD2C6]
            bg-white
            px-4
            text-[15px]
            text-[#1F1B18]
            placeholder:text-[#B7A999]
            focus:border-[#A1764E]
            focus:outline-none
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />

        <button
          type="button"
          onClick={onApply}
          disabled={disabled}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border border-[#1F1B18]
            bg-[#1F1B18]
            px-5
            text-[15px]
            font-medium
            text-white
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-[#2A2521]
            hover:shadow-lg
            active:scale-95
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:hover:translate-y-0
            disabled:hover:shadow-none
          "
        >
          Apply
          <ArrowRight size={17} strokeWidth={2} />
        </button>
      </div>

      {error ? (
        <p className="mt-3 text-sm font-medium text-[#A6462D]">
          {error}
        </p>
      ) : (
        <p className="mt-3 text-xs text-[#8C837B]">
          Press Enter or Apply to load your values, then press Play to
          traverse them.
        </p>
      )}
    </div>
  );
}
