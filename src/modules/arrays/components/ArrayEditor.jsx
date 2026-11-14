import { Dices, Upload } from "lucide-react";

export default function ArrayEditor({
  value,
  onChange,
  onApply,
  onSample,
  error,
  disabled,
}) {
  return (
    <section className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Your data
        </p>
        <h2 className="mt-2 font-display text-3xl text-[#1F1B18]">
          Build an array
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#6B645D]">
          Enter numbers separated by commas. Leave the field blank to create an
          empty array.
        </p>
      </div>

      <label
        htmlFor="array-values"
        className="mb-2 block text-sm font-medium text-[#514940]"
      >
        Array values
      </label>
      <textarea
        id="array-values"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        rows={2}
        placeholder="e.g. 12, 4, 27, -3"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "array-input-error" : "array-input-help"}
        className="w-full resize-y rounded-xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 py-3 font-mono text-sm text-[#1F1B18] outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20 disabled:cursor-not-allowed disabled:opacity-60"
      />
      {error ? (
        <p id="array-input-error" role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      ) : (
        <p id="array-input-help" className="mt-2 text-xs text-[#8C837B]">
          Only finite numeric values are accepted.
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onApply}
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1F1B18] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#39312A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload size={17} />
          Use this array
        </button>
        <button
          type="button"
          onClick={onSample}
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#DDD2C6] bg-white px-5 py-2.5 text-sm font-medium text-[#514940] transition hover:border-[#A1764E] hover:bg-[#FCFAF7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A1764E] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Dices size={17} />
          Generate sample
        </button>
      </div>
    </section>
  );
}
