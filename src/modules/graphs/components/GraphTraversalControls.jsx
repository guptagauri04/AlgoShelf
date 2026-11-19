import { Play, Pause, RotateCcw, SkipForward, SkipBack } from "lucide-react";

export default function GraphTraversalControls({
  algorithm = "BFS",
  onAlgorithmChange,
  presetId = "connected",
  onPresetChange,
  presets = {},
  startNode = "A",
  onStartNodeChange,
  nodes = [],
  isPlaying = false,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  speed = 1000,
  onSpeedChange,
  isFinished = false,
  currentStepIndex = 0,
  totalSteps = 0,
}) {
  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        {/* Algorithm Selection */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A07A56]">
            Algorithm:
          </span>
          <div className="flex rounded-xl border border-[#E8DED2] bg-[#F7F2EB] p-1">
            <button
              type="button"
              onClick={() => onAlgorithmChange("BFS")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                algorithm === "BFS"
                  ? "bg-[#9D7653] text-white shadow-sm"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              BFS (Queue)
            </button>
            <button
              type="button"
              onClick={() => onAlgorithmChange("DFS")}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                algorithm === "DFS"
                  ? "bg-[#9D7653] text-white shadow-sm"
                  : "text-[#6B5B4D] hover:text-[#1F1B18]"
              }`}
            >
              DFS (Stack)
            </button>
          </div>
        </div>

        {/* Preset Graph Selection */}
        <div className="flex items-center gap-2">
          <label htmlFor="graph-preset-select" className="text-xs font-semibold text-[#6B5B4D]">
            Preset Graph:
          </label>
          <select
            id="graph-preset-select"
            value={presetId}
            onChange={(e) => onPresetChange(e.target.value)}
            className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-medium text-[#1F1B18] shadow-sm focus:border-[#A1764E] focus:outline-none"
          >
            {Object.keys(presets).map((key) => (
              <option key={key} value={key}>
                {presets[key].name} ({presets[key].directed ? "Directed" : "Undirected"})
              </option>
            ))}
          </select>
        </div>

        {/* Starting Vertex */}
        <div className="flex items-center gap-2">
          <label htmlFor="start-vertex-select" className="text-xs font-semibold text-[#6B5B4D]">
            Start Vertex:
          </label>
          <select
            id="start-vertex-select"
            value={startNode}
            onChange={(e) => onStartNodeChange(e.target.value)}
            className="rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 font-mono text-xs font-bold text-[#A1764E] shadow-sm focus:border-[#A1764E] focus:outline-none"
          >
            {nodes.map((n) => (
              <option key={n.id} value={n.id}>
                {n.id}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1 rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE]"
            title="Reset"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={onStepBackward}
            disabled={currentStepIndex <= 0 || isPlaying}
            className="flex items-center gap-1 rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
            title="Step Backward"
          >
            <SkipBack size={14} />
          </button>

          <button
            type="button"
            onClick={onPlayPause}
            className={`flex items-center gap-1.5 rounded-xl px-5 py-2 text-xs font-bold text-white shadow-md transition ${
              isPlaying
                ? "bg-[#D97706] hover:bg-[#B45309]"
                : isFinished
                ? "bg-[#4B7754] hover:bg-[#3B5E42]"
                : "bg-[#9D7653] hover:bg-[#8A6645]"
            }`}
          >
            {isPlaying ? (
              <>
                <Pause size={14} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={14} />
                <span>{isFinished ? "Replay" : "Play"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onStepForward}
            disabled={currentStepIndex >= totalSteps - 1 || isPlaying}
            className="flex items-center gap-1 rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
            title="Step Forward"
          >
            <SkipForward size={14} />
            <span>Step</span>
          </button>
        </div>

        {/* Step Counter & Speed */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono font-semibold text-[#6B5B4D]">
            Step <span className="text-[#1F1B18]">{currentStepIndex + 1}</span> / {totalSteps}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-[#8C837B]">Speed:</span>
            <input
              type="range"
              min="200"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => onSpeedChange(Number(e.target.value))}
              className="w-24 accent-[#9D7653] cursor-pointer"
            />
            <span className="text-[11px] font-mono text-[#8C837B]">{(speed / 1000).toFixed(1)}s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
