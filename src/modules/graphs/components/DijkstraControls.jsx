import {
  ChevronLeft, ChevronRight, Play, Pause, RotateCcw,
  Shuffle, Gauge
} from "lucide-react";

const SPEED_OPTIONS = [
  { label: "0.5×", value: 1600 },
  { label: "1×",   value: 800  },
  { label: "2×",   value: 400  },
  { label: "3×",   value: 200  },
];

export default function DijkstraControls({
  source, setSource,
  destination, setDestination,
  nodes,
  onStart,
  playing, onPlayPause,
  onNext, onPrev, onReset,
  onRandomize,
  currentStep, totalSteps,
  speed, onSpeedChange,
  isRunning,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-5 shadow-sm space-y-5">
      {/* Source / Destination selectors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#A1764E] mb-1.5">
            Source Node
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-2 font-mono text-sm text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#A1764E]/30 disabled:opacity-50"
          >
            {nodes.map((n) => (
              <option key={n} value={n} disabled={n === destination}>{n}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-[#A1764E] mb-1.5">
            Destination
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            disabled={isRunning}
            className="w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-3 py-2 font-mono text-sm text-[#1F1B18] focus:outline-none focus:ring-2 focus:ring-[#A1764E]/30 disabled:opacity-50"
          >
            {nodes.map((n) => (
              <option key={n} value={n} disabled={n === source}>{n}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Start / Reset */}
        {!isRunning ? (
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1F1B18] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#342D28]"
          >
            <Play size={15} />
            Run Dijkstra
          </button>
        ) : (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E8DDD1] bg-[#FAF8F5] px-5 py-2.5 text-sm font-semibold text-[#6B645D] transition hover:border-[#D7C5AF]"
          >
            <RotateCcw size={15} />
            Reset
          </button>
        )}

        {/* Play / Pause */}
        {isRunning && (
          <button
            onClick={onPlayPause}
            className="inline-flex items-center gap-2 rounded-xl border border-[#E8DDD1] bg-[#FAF8F5] px-4 py-2.5 text-sm font-semibold text-[#1F1B18] transition hover:border-[#D7C5AF]"
          >
            {playing ? <Pause size={15} /> : <Play size={15} />}
            {playing ? "Pause" : "Play"}
          </button>
        )}

        {/* Step controls */}
        {isRunning && (
          <div className="flex items-center gap-1">
            <button
              onClick={onPrev}
              disabled={currentStep === 0}
              className="rounded-xl border border-[#E8DDD1] p-2.5 text-[#6B645D] transition hover:border-[#D7C5AF] disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="min-w-[64px] text-center font-mono text-xs text-[#8C837B]">
              {currentStep + 1} / {totalSteps}
            </span>
            <button
              onClick={onNext}
              disabled={currentStep >= totalSteps - 1}
              className="rounded-xl border border-[#E8DDD1] p-2.5 text-[#6B645D] transition hover:border-[#D7C5AF] disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Randomize (only when not running) */}
        {!isRunning && (
          <button
            onClick={onRandomize}
            className="ml-auto inline-flex items-center gap-2 rounded-xl border border-[#E8DDD1] px-4 py-2.5 text-sm font-medium text-[#6B645D] transition hover:border-[#D7C5AF]"
          >
            <Shuffle size={15} />
            New Source
          </button>
        )}
      </div>

      {/* Speed selector */}
      {isRunning && (
        <div className="flex items-center gap-3">
          <Gauge size={15} className="text-[#A1764E] shrink-0" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8C837B]">Speed</span>
          <div className="flex gap-2">
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSpeedChange(opt.value)}
                className={`rounded-lg border px-3 py-1 text-xs font-semibold transition ${
                  speed === opt.value
                    ? "border-[#A1764E] bg-[#A1764E] text-white"
                    : "border-[#E8DDD1] bg-[#FAF8F5] text-[#6B645D] hover:border-[#D7C5AF]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Progress bar */}
          <div className="ml-auto h-1.5 w-32 overflow-hidden rounded-full bg-[#EEE5DB]">
            <div
              className="h-full rounded-full bg-[#A1764E] transition-all duration-300"
              style={{ width: `${totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
