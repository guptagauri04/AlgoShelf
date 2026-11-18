import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Search,
  PlusCircle,
  Trash2,
  ListPlus,
  AlertCircle,
} from "lucide-react";

export default function BstControls({
  activeAction,
  setActiveAction,
  inputValue,
  setInputValue,
  error,
  isPlaying,
  speed,
  setSpeed,
  currentStepIndex,
  totalSteps,
  handleExecute,
  stepForward,
  stepBackward,
  togglePlay,
  handleResetSample,
  handleClear,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Action Selector */}
      <div className="flex border-b border-[#EEE5DB] pb-4">
        <button
          type="button"
          onClick={() => setActiveAction("insert")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            activeAction === "insert"
              ? "border-[#A1764E] text-[#8B5A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <PlusCircle size={16} />
          Insert Node
        </button>
        <button
          type="button"
          onClick={() => setActiveAction("search")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            activeAction === "search"
              ? "border-[#4A7A54] text-[#3F6848]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <Search size={16} />
          Search Target
        </button>
        <button
          type="button"
          onClick={() => setActiveAction("delete")}
          className={`flex items-center gap-2 border-b-2 px-5 py-2.5 text-sm font-semibold transition-all ${
            activeAction === "delete"
              ? "border-[#C84B31] text-[#9E2A2B]"
              : "border-transparent text-[#8C837B] hover:text-[#1F1B18]"
          }`}
        >
          <Trash2 size={16} />
          Delete Node
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {/* Left: Input Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="bst-val-input"
              className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]"
            >
              {activeAction === "insert"
                ? "Value to Insert"
                : activeAction === "search"
                ? "Target to Search"
                : "Value to Delete"}
            </label>
            <input
              id="bst-val-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 45"
              className="mt-1.5 w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-mono text-base font-semibold text-[#1F1B18] shadow-xs focus:border-[#A1764E] focus:outline-none focus:ring-1 focus:ring-[#A1764E]"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-[#FDF2F0] p-3 text-xs font-semibold text-[#9E2A2B]">
              <AlertCircle size={15} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleExecute}
            className={`w-full rounded-xl py-3 text-sm font-semibold text-white shadow-sm transition-all ${
              activeAction === "insert"
                ? "bg-[#9D7653] hover:bg-[#8A6645]"
                : activeAction === "search"
                ? "bg-[#4A7A54] hover:bg-[#3D6646]"
                : "bg-[#B84A39] hover:bg-[#A33D2D]"
            }`}
          >
            {activeAction === "insert"
              ? "Execute Insertion"
              : activeAction === "search"
              ? "Execute Search"
              : "Execute Deletion"}
          </button>
        </div>

        {/* Right: Playback Controls */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#EEE5DB] bg-[#FCFBF8] p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A1764E]">
              Animation Playback
            </p>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={stepBackward}
                disabled={currentStepIndex <= 0}
                className="rounded-xl border border-[#E8DDD1] bg-white p-2.5 text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA] disabled:opacity-40"
                title="Previous step"
              >
                <SkipBack size={18} />
              </button>

              <button
                type="button"
                onClick={togglePlay}
                disabled={totalSteps <= 0}
                className="flex items-center gap-2 rounded-xl bg-[#9D7653] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#8A6645] disabled:opacity-40"
              >
                {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                <span>{isPlaying ? "Pause" : "Play"}</span>
              </button>

              <button
                type="button"
                onClick={stepForward}
                disabled={totalSteps <= 0 || currentStepIndex >= totalSteps - 1}
                className="rounded-xl border border-[#E8DDD1] bg-white p-2.5 text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA] disabled:opacity-40"
                title="Next step"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Speed slider */}
            <div className="mt-5">
              <div className="flex justify-between text-xs font-semibold text-[#8C837B]">
                <span>Speed</span>
                <span>{speed === 1300 ? "Slow" : speed === 900 ? "Normal" : "Fast"}</span>
              </div>
              <input
                type="range"
                min="400"
                max="1400"
                step="200"
                value={1800 - speed}
                onChange={(e) => setSpeed(1800 - Number(e.target.value))}
                className="mt-2 w-full accent-[#A1764E]"
              />
            </div>
          </div>

          <div className="mt-6 border-t border-[#EEE5DB] pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetSample}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-white py-2 text-xs font-semibold text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA]"
              >
                <RotateCcw size={14} />
                Reset Sample Tree
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-white py-2 text-xs font-semibold text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA]"
              >
                <ListPlus size={14} />
                Clear Tree
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
