import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Layers,
} from "lucide-react";
import { TREE_PRESETS } from "../utils/treeData";

export default function TraversalControls({
  traversalType,
  onTraversalChange,
  presetKey,
  onPresetChange,
  playing,
  onPlayPause,
  onNext,
  onPrev,
  onReset,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  isFinished,
}) {
  const traversals = [
    {
      id: "inorder",
      name: "Inorder",
      order: "Left → Root → Right",
      badge: "L → N → R",
    },
    {
      id: "preorder",
      name: "Preorder",
      order: "Root → Left → Right",
      badge: "N → L → R",
    },
    {
      id: "postorder",
      name: "Postorder",
      order: "Left → Right → Root",
      badge: "L → R → N",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      {/* Top Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
            Interactive Controls
          </p>
          <h2 className="mt-1 font-display text-3xl text-[#1F1B18]">
            Configure Traversal
          </h2>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-1.5 text-xs">
          <span className="px-2 text-[#8C837B]">Speed:</span>
          {[
            { label: "0.5x", val: 1100 },
            { label: "1x", val: 700 },
            { label: "2x", val: 350 },
          ].map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => onSpeedChange(item.val)}
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

      {/* Traversal Method Selector Tabs */}
      <div className="space-y-4">
        <div>
          <label className="mb-2.5 flex items-center gap-2 text-sm font-semibold text-[#514940]">
            <GitBranch size={16} className="text-[#A1764E]" />
            <span>Select Traversal Technique</span>
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {traversals.map((t) => {
              const isSelected = traversalType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => onTraversalChange(t.id)}
                  className={`flex flex-col rounded-2xl border p-4 text-left transition-all ${
                    isSelected
                      ? "border-[#A1764E] bg-[#F7F2EB] shadow-sm ring-1 ring-[#A1764E]"
                      : "border-[#E8DED2] bg-[#FCFBF8] hover:border-[#D5C7B7] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-[#1F1B18]">
                      {t.name}
                    </span>
                    <span
                      className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-semibold ${
                        isSelected
                          ? "bg-[#A1764E] text-white"
                          : "bg-[#EFE7DE] text-[#6B5E52]"
                      }`}
                    >
                      {t.badge}
                    </span>
                  </div>
                  <span className="mt-1 text-xs text-[#70675E]">{t.order}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tree Preset Selector */}
        <div>
          <label
            htmlFor="tree-preset-select"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#514940]"
          >
            <Layers size={16} className="text-[#A1764E]" />
            <span>Choose Binary Tree Preset</span>
          </label>
          <select
            id="tree-preset-select"
            value={presetKey}
            onChange={(e) => onPresetChange(e.target.value)}
            className="h-11 w-full rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-body text-sm font-medium text-[#1F1B18] outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
          >
            {Object.values(TREE_PRESETS).map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.description}
              </option>
            ))}
          </select>
        </div>

        {/* Action Controls & Stepper */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#EEE5DB] pt-6">
          {/* Main Play / Step Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onPlayPause}
              className={`inline-flex h-12 items-center gap-2 rounded-2xl px-6 text-sm font-medium shadow-sm transition ${
                playing
                  ? "bg-[#A1764E] text-white hover:bg-[#8B643F]"
                  : "bg-[#1F1B18] text-white hover:bg-[#342D28]"
              }`}
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
              <span>{playing ? "Pause" : isFinished ? "Replay" : "Play"}</span>
            </button>

            <button
              type="button"
              onClick={onPrev}
              disabled={currentStep === 0 || playing}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] text-[#5F5952] transition hover:bg-[#F2ECE4] disabled:cursor-not-allowed disabled:opacity-40"
              title="Step Backward"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={onNext}
              disabled={isFinished || playing}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] text-[#5F5952] transition hover:bg-[#F2ECE4] disabled:cursor-not-allowed disabled:opacity-40"
              title="Step Forward"
            >
              <ChevronRight size={20} />
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 text-sm font-medium text-[#5F5952] transition hover:bg-[#F2ECE4]"
              title="Reset Visualization"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Reset</span>
            </button>
          </div>

          {/* Step Progress Pill */}
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-[#E5DDD2] bg-[#FAF7F2] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#7A6E63]">
              Step{" "}
              <span className="font-mono text-sm text-[#1F1B18]">
                {currentStep + 1}
              </span>{" "}
              of{" "}
              <span className="font-mono text-sm text-[#1F1B18]">
                {totalSteps}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
