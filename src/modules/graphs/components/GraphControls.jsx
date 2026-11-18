import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Compass,
} from "lucide-react";

export default function GraphControls({
  algorithm,
  setAlgorithm,
  startNodeId,
  setStartNodeId,
  nodes,
  isPlaying,
  speed,
  setSpeed,
  currentStepIndex,
  totalSteps,
  handleStart,
  handleReset,
  stepForward,
  stepBackward,
  togglePlay,
}) {
  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Left: Traversal Options */}
        <div className="space-y-4">
          <div>
            <span className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]">
              Select Traversal Algorithm
            </span>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAlgorithm("bfs")}
                className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                  algorithm === "bfs"
                    ? "border-[#A1764E] bg-[#F7F2EA] text-[#8B5A2B] shadow-xs"
                    : "border-[#E8DDD1] bg-white text-[#6B5B4D] hover:bg-[#FDFBF7]"
                }`}
              >
                Breadth-First Search (BFS)
              </button>
              <button
                type="button"
                onClick={() => setAlgorithm("dfs")}
                className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                  algorithm === "dfs"
                    ? "border-[#A1764E] bg-[#F7F2EA] text-[#8B5A2B] shadow-xs"
                    : "border-[#E8DDD1] bg-white text-[#6B5B4D] hover:bg-[#FDFBF7]"
                }`}
              >
                Depth-First Search (DFS)
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="start-node-select"
              className="block text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]"
            >
              Start Vertex
            </label>
            <select
              id="start-node-select"
              value={startNodeId}
              onChange={(e) => setStartNodeId(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 py-2.5 font-mono text-sm font-semibold text-[#1F1B18] shadow-xs focus:border-[#A1764E] focus:outline-none"
            >
              {nodes.map((n) => (
                <option key={`opt-${n.id}`} value={n.id}>
                  Vertex {n.id}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#9D7653] py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#8A6645]"
          >
            <Compass size={17} />
            <span>Launch {algorithm.toUpperCase()} Traversal</span>
          </button>
        </div>

        {/* Right: Stepping Controls */}
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
                className="flex items-center gap-2 rounded-xl bg-[#9D7653] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#8A6645]"
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
            <button
              type="button"
              onClick={handleReset}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#E8DDD1] bg-white py-2 text-xs font-semibold text-[#6B5B4D] shadow-xs transition-all hover:bg-[#F7F2EA]"
            >
              <RotateCcw size={14} />
              Reset Traversal State
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
