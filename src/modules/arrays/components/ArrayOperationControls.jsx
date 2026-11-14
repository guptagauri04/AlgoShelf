import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

export default function ArrayOperationControls({
  index,
  onIndexChange,
  value,
  onValueChange,
  onInsert,
  onDelete,
  error,
  operation,
  currentStep,
  stepCount,
  playing,
  onPrevious,
  onNext,
  onPlayPause,
  onReset,
}) {
  const locked = Boolean(operation);
  const actionButtonBase =
    "inline-flex min-h-12 w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Change the array
        </p>
        <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
          Insert or delete
        </h2>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="operation-index"
            className="mb-2 block text-sm font-medium text-[#514940]"
          >
            Index
          </label>
          <input
            id="operation-index"
            type="number"
            step="1"
            value={index}
            onChange={(event) => onIndexChange(event.target.value)}
            disabled={locked}
            placeholder="e.g. 2"
            className="h-11 w-full rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        <div>
          <label
            htmlFor="insert-value"
            className="mb-2 block text-sm font-medium text-[#514940]"
          >
            Value
          </label>
          <input
            id="insert-value"
            type="number"
            step="any"
            value={value}
            onChange={(event) => onValueChange(event.target.value)}
            disabled={locked}
            placeholder="e.g. 42"
            className="h-11 w-full rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-sm outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20 disabled:cursor-not-allowed disabled:opacity-60"
          />
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={onInsert}
            disabled={locked}
            className={`${actionButtonBase} border-[#5A7354] bg-[#5A7354] text-white hover:bg-[#496343] focus-visible:ring-[#5A7354]`}
          >
            Insert at index
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={locked}
            className={`${actionButtonBase} border-[#DDD2C6] bg-white text-[#514940] hover:border-[#A1764E] hover:bg-[#FCFAF7] focus-visible:ring-[#A1764E]`}
          >
            Delete at index
          </button>
        </div>
      </div>

      {operation ? (
        <div className="mt-7 border-t border-[#EEE5DB] pt-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#A1764E]">
                Current operation
              </p>
              <p className="mt-1 font-semibold capitalize text-[#1F1B18]">
                {operation.type}
              </p>
            </div>
            <p className="font-mono text-sm text-[#6B645D]" aria-live="polite">
              Step {currentStep + 1} of {stepCount}
            </p>
          </div>

          <div className="mb-5 h-2 overflow-hidden rounded-full bg-[#EFE8DF]">
            <div
              className="h-full rounded-full bg-[#A1764E] transition-[width] duration-300"
              style={{
                width: `${stepCount > 1 ? (currentStep / (stepCount - 1)) * 100 : 100}%`,
              }}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={currentStep === 0}
              aria-label="Previous step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD2C6] bg-white text-[#514940] transition hover:border-[#A1764E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={onPlayPause}
              disabled={currentStep === stepCount - 1}
              className="inline-flex min-h-11 min-w-32 items-center justify-center gap-2 rounded-xl bg-[#1F1B18] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#39312A] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={onNext}
              disabled={currentStep === stepCount - 1}
              aria-label="Next step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#DDD2C6] bg-white text-[#514940] transition hover:border-[#A1764E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={19} />
            </button>
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD2C6] bg-white px-4 py-2.5 text-sm font-medium text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7]"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
          <p className="mt-4 text-center text-xs leading-5 text-[#8C837B]">
            Reset restores the array and unlocks the operation inputs.
          </p>
        </div>
      ) : (
        <p className="mt-5 text-xs leading-5 text-[#8C837B]">
          Insertion accepts indices from 0 to the array length. Deletion
          requires an existing index.
        </p>
      )}
    </section>
  );
}
