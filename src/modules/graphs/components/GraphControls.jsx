import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Network,
  GitGraph,
} from "lucide-react";
import { GRAPH_PRESETS } from "../utils/graphOperations";

export default function GraphControls({
  presetKey,
  onSelectPreset,
  algorithm,
  onSelectAlgorithm,
  isDirected,
  onToggleDirected,
  nodes,
  startNodeId,
  onSelectStartNode,
  isPlaying,
  onTogglePlayback,
  currentStep,
  stepCount,
  onPreviousStep,
  onNextStep,
  onReset,
  speed,
  onSelectSpeed,
}) {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-[#E8DDD1] bg-[#FCFBF8] p-6 shadow-sm">
      {/* Configuration Header */}
      <div>
        <p className="font-body text-xs font-semibold uppercase tracking-[0.35em] text-[#A07A56]">
          Interactive Console
        </p>
        <h2 className="font-display mt-2 text-2xl text-[#202020]">
          Graph Controls &amp; Settings
        </h2>
      </div>

      {/* Preset Selector */}
      <div className="grid gap-2">
        <label
          htmlFor="preset-select"
          className="text-xs font-semibold uppercase tracking-wider text-[#6B5B4D]"
        >
          Graph Preset
        </label>
        <select
          id="preset-select"
          value={presetKey}
          onChange={(e) => onSelectPreset(e.target.value)}
          className="w-full rounded-xl border border-[#E8DED2] bg-white px-3.5 py-2.5 text-sm font-medium text-[#1F1B18] shadow-sm transition hover:border-[#D7C5AF] focus:border-[#A1764E] focus:outline-none"
        >
          {Object.entries(GRAPH_PRESETS).map(([key, data]) => (
            <option key={key} value={key}>
              {data.name}
            </option>
          ))}
        </select>
      </div>

      {/* Algorithm & Directedness Row */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Algorithm Tabs */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-[#6B5B4D] block mb-2">
            Traversal Algorithm
          </label>
          <div className="flex rounded-xl border border-[#E8DED2] bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => onSelectAlgorithm("bfs")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                algorithm === "bfs"
                  ? "bg-[#A65B38] text-white shadow-sm"
                  : "text-[#6B5B4D] hover:bg-[#F7F2EB]"
              }`}
            >
              <Network size={14} />
              BFS (Queue)
            </button>
            <button
              type="button"
              onClick={() => onSelectAlgorithm("dfs")}
              className={`flex-1 flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all ${
                algorithm === "dfs"
                  ? "bg-[#A65B38] text-white shadow-sm"
                  : "text-[#6B5B4D] hover:bg-[#F7F2EB]"
              }`}
            >
              <GitGraph size={14} />
              DFS (Stack)
            </button>
          </div>
        </div>

        {/* Start Node Selector */}
        <div>
          <label
            htmlFor="start-node-select"
            className="text-xs font-semibold uppercase tracking-wider text-[#6B5B4D] block mb-2"
          >
            Start Vertex
          </label>
          <div className="flex items-center gap-2">
            <select
              id="start-node-select"
              value={startNodeId}
              onChange={(e) => onSelectStartNode(e.target.value)}
              className="flex-1 rounded-xl border border-[#E8DED2] bg-white px-3.5 py-2 text-sm font-semibold text-[#1F1B18] shadow-sm transition hover:border-[#D7C5AF] focus:border-[#A1764E] focus:outline-none"
            >
              {nodes.map((node) => (
                <option key={node.id} value={node.id}>
                  Vertex &apos;{node.label}&apos;
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => onToggleDirected(!isDirected)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDirected
                  ? "border-[#A65B38] bg-[#FAEAE0] text-[#A65B38]"
                  : "border-[#E8DED2] bg-white text-[#6B5B4D] hover:bg-[#F7F2EB]"
              }`}
              title="Toggle Directed vs Undirected graph"
            >
              {isDirected ? "Directed â†’" : "Undirected â€”"}
            </button>
          </div>
        </div>
      </div>

      {/* Traversal Playback Controls */}
      <div className="border-t border-[#ECE3D8] pt-4">
        <div className="flex items-center justify-between mb-3 text-xs text-[#6B5B4D]">
          <span className="font-semibold uppercase tracking-wider">
            Step {currentStep + 1} of {Math.max(1, stepCount)}
          </span>
          <div className="flex items-center gap-1">
            {[0.5, 1, 2].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelectSpeed(s)}
                className={`rounded px-2 py-0.5 text-xs font-mono font-medium transition ${
                  speed === s
                    ? "bg-[#A65B38] text-white"
                    : "bg-[#F0EAE1] text-[#6B5B4D] hover:bg-[#E5DDD2]"
                }`}
              >
                {s}Ã—
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onReset}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DED2] bg-white text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F2EB] hover:text-[#1F1B18]"
            title="Reset to beginning"
            aria-label="Reset traversal"
          >
            <RotateCcw size={16} />
          </button>

          <button
            type="button"
            onClick={onPreviousStep}
            disabled={currentStep <= 0}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DED2] bg-white text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F2EB] disabled:cursor-not-allowed disabled:opacity-40"
            title="Step backward"
            aria-label="Previous step"
          >
            <SkipBack size={16} />
          </button>

          <button
            type="button"
            onClick={onTogglePlayback}
            className="flex h-11 px-5 items-center justify-center gap-2 rounded-xl bg-[#A65B38] font-semibold text-white shadow-md transition hover:bg-[#8D4B2C]"
            aria-label={isPlaying ? "Pause traversal" : "Play traversal"}
          >
            {isPlaying ? (
              <>
                <Pause size={17} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={17} fill="currentColor" />
                <span>{currentStep >= stepCount - 1 ? "Replay" : "Play"}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onNextStep}
            disabled={currentStep >= stepCount - 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8DED2] bg-white text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F2EB] disabled:cursor-not-allowed disabled:opacity-40"
            title="Step forward"
            aria-label="Next step"
          >
            <SkipForward size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
