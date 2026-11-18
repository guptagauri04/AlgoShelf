import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Route,
  Zap,
} from "lucide-react";

export default function DijkstraControls({
  nodes = [],
  sourceId,
  setSourceId,
  destId,
  setDestId,
  selectedPreset,
  setSelectedPreset,
  presets = [],
  isPlaying,
  togglePlay,
  stepForward,
  stepBackward,
  handleReset,
  currentStepIndex,
  totalSteps,
  speed,
  setSpeed,
  totalCost,
  shortestPath = [],
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Simulation Parameters
          </p>
          <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Configure Dijkstra
          </h3>
        </div>

        {/* Speed Controls */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 text-xs">
          <span className="px-2 text-[#8C837B]">Speed:</span>
          {[
            { label: "0.5x", val: 1200 },
            { label: "1x", val: 750 },
            { label: "2x", val: 400 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setSpeed(item.val)}
              className={`rounded-xl px-2.5 py-1 font-medium transition ${
                speed === item.val
                  ? "bg-[#1F1B18] text-white"
                  : "text-[#5F5952] hover:bg-[#F2ECE4]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Graph Topology Preset */}
        <div>
          <label htmlFor="dijkstra-preset" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
            Topology Preset
          </label>
          <select
            id="dijkstra-preset"
            value={selectedPreset}
            onChange={(e) => setSelectedPreset(e.target.value)}
            disabled={isPlaying}
            aria-label="Topology Preset"
            className="h-11 w-full rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-3 font-mono text-sm font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E]"
          >
            {presets.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Source Vertex */}
        <div>
          <label htmlFor="dijkstra-source" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
            Source Vertex
          </label>
          <select
            id="dijkstra-source"
            value={sourceId}
            onChange={(e) => setSourceId(e.target.value)}
            disabled={isPlaying}
            aria-label="Source Vertex"
            className="h-11 w-full rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-3 font-mono text-sm font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E]"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                Vertex {n.label}
              </option>
            ))}
          </select>
        </div>

        {/* Destination Vertex */}
        <div>
          <label htmlFor="dijkstra-dest" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
            Destination Vertex
          </label>
          <select
            id="dijkstra-dest"
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
            disabled={isPlaying}
            aria-label="Destination Vertex"
            className="h-11 w-full rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-3 font-mono text-sm font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E]"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                Vertex {n.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Control Buttons & Path Cost Banner */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-5">
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-[#1F1B18] px-5 text-sm font-medium text-white transition hover:bg-[#342D28]"
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? "Pause" : "Auto-Run"}</span>
          </button>

          <button
            type="button"
            onClick={stepBackward}
            disabled={currentStepIndex === 0}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] text-[#5F5952] transition hover:bg-[#F2ECE4] disabled:opacity-40"
            title="Step Backward"
            aria-label="Step Backward"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={stepForward}
            disabled={currentStepIndex >= totalSteps - 1}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] text-[#5F5952] transition hover:bg-[#F2ECE4] disabled:opacity-40"
            title="Step Forward"
            aria-label="Step Forward"
          >
            <ChevronRight size={18} />
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 text-xs font-semibold text-[#6B5B4D] transition hover:bg-[#F4ECE3]"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {/* Path Cost Badge */}
        {shortestPath.length > 0 && totalCost !== null ? (
          <div className="flex items-center gap-2 rounded-2xl border border-[#5A7354]/40 bg-[#EAF2E8] px-4 py-2 font-mono text-xs">
            <Route size={16} className="text-[#3D5A37]" />
            <span className="font-semibold text-[#3D5A37]">
              Shortest Path: {shortestPath.join(" → ")} (Cost: {totalCost})
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-mono text-[#8C837B]">
            <Zap size={14} className="text-[#C4883A]" />
            <span>Step: {currentStepIndex + 1} / {totalSteps}</span>
          </div>
        )}
      </div>
    </div>
  );
}
