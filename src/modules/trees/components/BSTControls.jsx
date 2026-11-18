import {
  Plus,
  Search,
  Trash2,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function BSTControls({
  value = "",
  onValueChange,
  onInsert,
  onSearch,
  onDelete,
  error = null,
  currentStep = 0,
  stepCount = 0,
  isPlaying = false,
  onPlayPause,
  onNext,
  onPrevious,
  onReset,
  onClear,
  speed = 800,
  onSpeedChange,
}) {
  const isOperationActive = stepCount > 0;

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      onInsert();
    }
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#E8DDD1] bg-white p-5 shadow-sm sm:p-6">
      {/* Top: Value Input & Main Action Buttons */}
      <div>
        <label
          htmlFor="bstNodeValue"
          className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]"
        >
          Node Value (1 – 999)
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            id="bstNodeValue"
            type="number"
            min="1"
            max="999"
            placeholder="e.g. 42"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-28 rounded-xl border border-[#D7C5AF] bg-[#FAF8F5] px-3.5 py-2.5 font-mono text-base font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E] focus:bg-white focus:ring-2 focus:ring-[#A1764E]/20"
          />

          <button
            type="button"
            onClick={onInsert}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#A1764E] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#8B643E] active:scale-95"
          >
            <Plus size={16} />
            Insert
          </button>

          <button
            type="button"
            onClick={onSearch}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#D7C5AF] bg-white px-4 py-2.5 text-sm font-semibold text-[#6B5B4D] transition hover:border-[#A1764E] hover:text-[#1F1B18] active:scale-95"
          >
            <Search size={16} />
            Search
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8D2CF] bg-[#FDF8F7] px-4 py-2.5 text-sm font-semibold text-[#C53929] transition hover:border-[#D93025] hover:bg-[#FCE8E6] active:scale-95"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>

        {error && (
          <p className="mt-2 text-xs font-medium text-[#D93025]">{error}</p>
        )}
      </div>

      {/* Middle: Step-by-Step Playback Controls */}
      <div className="rounded-xl border border-[#F0EAE1] bg-[#FAF8F5] p-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPrevious}
              disabled={!isOperationActive || currentStep === 0}
              className="rounded-lg border border-[#E0D5C7] bg-white p-2 text-[#6B5B4D] transition hover:bg-[#F0EAE1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous step"
            >
              <SkipBack size={16} />
            </button>

            <button
              type="button"
              onClick={onPlayPause}
              disabled={!isOperationActive}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#A1764E] px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-[#8B643E] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              {isPlaying ? "Pause" : "Play"}
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={!isOperationActive || currentStep >= stepCount - 1}
              className="rounded-lg border border-[#E0D5C7] bg-white p-2 text-[#6B5B4D] transition hover:bg-[#F0EAE1] disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next step"
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#6B5B4D]">
            <span>
              Step {stepCount > 0 ? currentStep + 1 : 0} of {stepCount}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[#8C7A6B]">Speed:</span>
              <select
                value={speed}
                onChange={(e) => onSpeedChange(Number(e.target.value))}
                className="rounded-md border border-[#D7C5AF] bg-white px-2 py-1 text-xs text-[#1F1B18] outline-none"
              >
                <option value={1400}>0.5x</option>
                <option value={800}>1.0x</option>
                <option value={400}>2.0x</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom: Presets & Quick Tree Layouts */}
      <div className="border-t border-[#F0EAE1] pt-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#8C7A6B]">
          Tree Presets
        </span>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onReset("balanced")}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4C3F] transition hover:border-[#A1764E]"
          >
            <Sparkles size={12} className="text-[#A1764E]" />
            Balanced Tree
          </button>

          <button
            type="button"
            onClick={() => onReset("simple")}
            className="rounded-lg border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4C3F] transition hover:border-[#A1764E]"
          >
            Small (6 Nodes)
          </button>

          <button
            type="button"
            onClick={() => onReset("skewed-right")}
            className="rounded-lg border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4C3F] transition hover:border-[#A1764E]"
          >
            Right-Skewed
          </button>

          <button
            type="button"
            onClick={() => onReset("skewed-left")}
            className="rounded-lg border border-[#E0D5C7] bg-white px-3 py-1.5 text-xs font-medium text-[#5A4C3F] transition hover:border-[#A1764E]"
          >
            Left-Skewed
          </button>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-1 rounded-lg border border-[#E8D2CF] bg-[#FDF8F7] px-3 py-1.5 text-xs font-medium text-[#C53929] transition hover:bg-[#FCE8E6]"
          >
            <RotateCcw size={12} />
            Empty Tree
          </button>
        </div>
      </div>
    </div>
  );
}
