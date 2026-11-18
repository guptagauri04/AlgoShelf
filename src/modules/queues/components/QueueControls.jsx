import { useState } from "react";
import { Plus, Minus, Eye, RotateCcw, AlertCircle } from "lucide-react";

export default function QueueControls({
  onEnqueue,
  onDequeue,
  onPeekFront,
  onPeekRear,
  onReset,
  isFull = false,
  isEmpty = false,
  error = null,
}) {
  const [inputVal, setInputVal] = useState("");

  const handleEnqueue = (e) => {
    e.preventDefault();
    const num = parseInt(inputVal, 10);
    if (!isNaN(num)) {
      onEnqueue(num);
      setInputVal("");
    }
  };

  return (
    <div className="rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EEE5DB] pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-[#1F1B18]">
            Queue Operations
          </h3>
          <p className="text-xs text-[#8C837B]">
            Add to rear, remove from front, and inspect boundaries
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3 py-1.5 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE]"
        >
          <RotateCcw size={13} />
          <span>Reset Queue</span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Enqueue Form */}
        <form onSubmit={handleEnqueue} className="flex gap-2">
          <input
            type="number"
            placeholder="Item value"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            disabled={isFull}
            className="w-32 rounded-xl border border-[#E8DED2] bg-white px-3 py-2 text-xs font-mono text-[#1F1B18] shadow-sm focus:border-[#4B7754] focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isFull || !inputVal.trim()}
            className="flex items-center gap-1.5 rounded-xl bg-[#4B7754] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#3B5E42] disabled:opacity-40"
          >
            <Plus size={14} />
            <span>Enqueue</span>
          </button>
        </form>

        <div className="h-6 w-px bg-[#EEE5DB] hidden sm:block" />

        {/* Dequeue Button */}
        <button
          type="button"
          onClick={onDequeue}
          disabled={isEmpty}
          className="flex items-center gap-1.5 rounded-xl bg-[#DC2626] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#B91C1C] disabled:opacity-40"
        >
          <Minus size={14} />
          <span>Dequeue (Front)</span>
        </button>

        {/* Peek Buttons */}
        <button
          type="button"
          onClick={onPeekFront}
          disabled={isEmpty}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3.5 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
        >
          <Eye size={14} className="text-[#D97706]" />
          <span>Peek Front</span>
        </button>

        <button
          type="button"
          onClick={onPeekRear}
          disabled={isEmpty}
          className="flex items-center gap-1.5 rounded-xl border border-[#E8DED2] bg-white px-3.5 py-2 text-xs font-semibold text-[#6B5B4D] shadow-sm transition hover:bg-[#F7F3EE] disabled:opacity-40"
        >
          <Eye size={14} className="text-[#4B7754]" />
          <span>Peek Rear</span>
        </button>
      </div>

      {/* Overflow/Underflow Alert Banner */}
      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] p-3 text-xs font-medium text-[#991B1B]">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
