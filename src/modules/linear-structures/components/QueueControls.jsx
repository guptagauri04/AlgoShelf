import { useState } from "react";
import { ArrowLeft, ArrowRight, Eye, RotateCcw, Sparkles } from "lucide-react";

export default function QueueControls({
  onEnqueue,
  onDequeue,
  onPeekFront,
  onPeekRear,
  onClear,
  onEnqueueRandom,
  isFull,
  isEmpty,
}) {
  const [inputValue, setInputValue] = useState("");

  const handleEnqueueSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    const success = onEnqueue(inputValue.trim());
    if (success) {
      setInputValue("");
    }
  };

  return (
    <div className="rounded-3xl border border-[#E8DDD1] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 border-b border-[#EEE5DB] pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A1764E]">
          Mutations & Operations
        </p>
        <h3 className="mt-1 font-display text-3xl text-[#1F1B18]">
          Queue Controls
        </h3>
      </div>

      <div className="space-y-6">
        {/* Enqueue Form */}
        <form onSubmit={handleEnqueueSubmit} className="space-y-3">
          <label htmlFor="queue-enqueue-input" className="block text-sm font-medium text-[#514940]">
            Enqueue New Element (Rear)
          </label>
          <div className="flex flex-wrap gap-3">
            <input
              id="queue-enqueue-input"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. 56"
              className="h-12 flex-1 min-w-[160px] rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] px-4 font-mono text-base font-semibold text-[#1F1B18] outline-none transition focus:border-[#A1764E] focus:ring-2 focus:ring-[#A1764E]/20"
            />
            <button
              type="submit"
              disabled={isFull}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#1F1B18] px-6 text-sm font-medium text-white transition hover:bg-[#342D28] disabled:opacity-50"
            >
              <ArrowRight size={16} />
              Enqueue
            </button>
            <button
              type="button"
              onClick={onEnqueueRandom}
              disabled={isFull}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#E8DDD1] bg-[#FCFBF8] px-4 text-sm font-medium text-[#6B5B4D] transition hover:bg-[#F4ECE3] disabled:opacity-50"
            >
              <Sparkles size={16} />
              Enqueue Random
            </button>
          </div>
        </form>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <button
            type="button"
            onClick={onDequeue}
            disabled={isEmpty}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#D98A72] bg-[#FDF3F0] font-medium text-[#A6452B] transition hover:bg-[#F9E2DC] disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Dequeue Front
          </button>

          <button
            type="button"
            onClick={onPeekFront}
            disabled={isEmpty}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#5A7354]/40 bg-[#EAF2E8] font-medium text-[#3D5A37] transition hover:bg-[#DCEDD9] disabled:opacity-50"
          >
            <Eye size={16} />
            Peek Front
          </button>

          <button
            type="button"
            onClick={onPeekRear}
            disabled={isEmpty}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#BFA592] bg-[#FCFBF8] font-medium text-[#6B5B4D] transition hover:bg-[#F0EAE1] disabled:opacity-50"
          >
            <Eye size={16} />
            Peek Rear
          </button>

          <button
            type="button"
            onClick={onClear}
            disabled={isEmpty}
            className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-[#DDD2C6] bg-[#FCFBF8] font-medium text-[#6B5B4D] transition hover:bg-[#EAE4DC] disabled:opacity-50"
          >
            <RotateCcw size={15} />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
